import { withSentry } from "app/core/utils/withSentry"
import { resolver } from "blitz"
import { ReadPostQuery } from "integrations/application"
import { Id } from "integrations/domain"
import { container } from "tsyringe"
import { z } from "zod"

export const zReadPost = z.object({ postId: z.string() })

const readPost = resolver.pipe(
  resolver.zod(zReadPost),
  (props, ctx) => {
    return {
      postId: new Id(props.postId),
      userId: ctx.session?.userId ? new Id(ctx.session.userId) : null,
    }
  },
  async (props) => {
    const readPostQuery = container.resolve(ReadPostQuery)

    const post = await readPostQuery.execute({
      postId: props.postId,
      userId: props.userId,
    })

    if (post instanceof Error) {
      throw post
    }

    // await new Promise((resolve) => setTimeout(resolve, 4000))

    return { post }
  }
)

export default withSentry(readPost, "readPost")
