import { withSentry } from "app/core/utils/withSentry"
import { resolver } from "blitz"

const logout = resolver.pipe(async (_, ctx) => {
  await ctx.session.$revoke()

  return {}
})

export default withSentry(logout, "logout")