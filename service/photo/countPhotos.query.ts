import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import db from "db"
import { InternalError } from "infrastructure/errors"

@injectable()
export class CountPhotosQuery {
  async execute() {
    try {
      const count = await db.post.count({
        where: {
          fileIds: { isEmpty: false },
        },
      })

      return count
    } catch (error) {
      captureException(error)
      if (error instanceof Error) {
        return new InternalError(error.message)
      }
      return new InternalError()
    }
  }
}
