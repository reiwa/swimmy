import { captureException } from "@sentry/node"
import { NotFoundError } from "blitz"
import { injectable } from "tsyringe"
import db from "db"
import { InternalError } from "infrastructure/errors"
import { PostNode } from "interface/__generated__/node"

type Props = {
  postId: string
  userId: string | null
}

@injectable()
export class ReadPostQuery {
  async execute(props: Props) {
    try {
      const post = await db.post.findUnique({
        where: { id: props.postId },
        include: {
          _count: {
            select: {
              likes: true,
              replies: true,
            },
          },
          reactions: {
            include: {
              _count: {
                select: {
                  users: true,
                },
              },
              users: {
                where: { id: props.userId ? props.userId : undefined },
              },
            },
          },
        },
      })

      if (post === null) {
        return new NotFoundError()
      }

      if (post instanceof Error) {
        return post
      }

      const node: PostNode = {
        id: post.id,
        createdAt: Math.floor(post.createdAt.getTime() / 1000),
        text: post.text,
        fileIds: post.fileIds,
        likesCount: post._count?.likes ?? 0,
        repliesCount: post._count?.replies ?? 0,
        reactions: post.reactions
          .filter((reaction) => {
            return 0 < reaction.count + reaction._count?.users
          })
          .sort((a, b) => {
            return a.createdAt.getTime() - b.createdAt.getTime()
          })
          .map((reaction) => {
            return {
              id: reaction.id,
              text: reaction.text,
              count: reaction._count?.users ?? 0,
              secretCount: reaction.count,
              isConnected: 0 < reaction.users.length,
            }
          }),
        isDeleted: post.isDeleted ?? false,
      }

      return node
    } catch (error) {
      captureException(error)
      if (error instanceof Error) {
        return new InternalError(error.message)
      }
      return new InternalError()
    }
  }
}
