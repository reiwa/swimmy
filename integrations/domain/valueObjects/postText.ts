import { z } from "zod"

const zValue = z.string().min(1).max(280)

/**
 * 投稿のテキスト
 */
export class PostText {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
