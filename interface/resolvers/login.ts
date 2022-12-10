import { container } from "tsyringe"
import { MutationResolvers } from "interface/__generated__/node"
import { LoginService } from "service"

export const login: MutationResolvers["login"] = async (_, args, ctx) => {
  const service = container.resolve(LoginService)

  const user = await service.execute({
    idToken: args.input.token,
  })

  if (user instanceof Error) {
    throw user
  }

  await ctx.session?.$create({
    userId: user.id.value,
    role: "USER",
  })

  return null
}
