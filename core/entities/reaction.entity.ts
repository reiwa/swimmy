import { z } from "zod"
import { Count, Id, ReactionText } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  text: z.instanceof(ReactionText),
  postId: z.instanceof(Id),
  userId: z.instanceof(Id).nullable(),
  count: z.instanceof(Count),
})

/**
 * 投稿
 */
export class ReactionEntity {
  /**
   * ID
   */
  readonly id!: Id

  /**
   * 投稿のID
   */
  readonly postId!: Id

  /**
   * テキスト
   */
  readonly text!: ReactionText

  /**
   * ユーザーのID
   */
  readonly userId!: Id | null

  /**
   * カウント
   */
  readonly count!: Count

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  incrementCount() {
    if (10 < this.count.value) {
      return new ReactionEntity(this.props)
    }

    return new ReactionEntity({
      ...this.props,
      count: new Count(this.count.value + 1),
    })
  }
}
