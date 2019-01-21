// @flow
export type Middleware = (ctx: Object, next: Function) => Promise<*>

export default async function exec(wares: Middleware[], ctx: Object) {
  let index = 0

  const next = async () => {
    const target = wares[index++]
    if (target) {
      await target(ctx, next)
    }
  }

  await next()
}