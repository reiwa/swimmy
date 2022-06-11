import { z } from "zod"

const zValue = z.string().max(12)

/**
 * ユーザー名
 */
export class Name {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
