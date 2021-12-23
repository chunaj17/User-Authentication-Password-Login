import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenData = req.token

  if (tokenData === undefined) return res.sendStatus(403)
  verify(tokenData, process.env.ACCESS_TOKEN as string, async (err, user) => {
    if (err) return res.sendStatus(403)
    if (user === undefined) return res.sendStatus(500)
    res.locals.username = user.name
    next()
  })
}
