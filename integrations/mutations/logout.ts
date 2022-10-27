import { resolver } from "@blitzjs/rpc"
import { withSentry } from "interface/utils/withSentry"

const logout = resolver.pipe(resolver.authorize(), async (_, ctx) => {
  await ctx.session.$revoke()

  return {}
})

export default withSentry(logout, "logout")
