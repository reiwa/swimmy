import { captureException } from "@sentry/node"
import { getStorage } from "firebase-admin/storage"
import { Id } from "integrations/domain"
import { InternalError } from "integrations/errors"
import { FirebaseAdapter } from "integrations/infrastructure"
import { tmpdir } from "os"
import sharp from "sharp"
import { injectable } from "tsyringe"

type Props = {
  fileId: Id
  width: number
  quality: number
}

@injectable()
export class ReadImageQuery {
  constructor(private readonly firebaseAdapter: FirebaseAdapter) {}

  async execute(props: Props) {
    try {
      await this.firebaseAdapter.initialize()

      const tmpPath = `${tmpdir()}/${props.fileId.value}`

      try {
        const buffer = await sharp(tmpPath).toBuffer()
        return buffer
      } catch (error) {}

      const bucket = getStorage().bucket()

      const [file] = await bucket.file(props.fileId.value).download({
        validation: false,
      })

      try {
        const shapeImage = sharp(file)
          .resize(props.width)
          .png({ quality: props.quality })

        const buffer = shapeImage.toBuffer()

        await shapeImage.toFile(tmpPath)

        return buffer
      } catch (error) {
        captureException(error)

        return file
      }
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new InternalError(error.message)
      }

      return new InternalError()
    }
  }
}
