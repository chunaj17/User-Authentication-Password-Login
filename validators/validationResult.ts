import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
export const validateReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    return res.status(422).json({
      msg: 'invalid entry',
      error: error.array(),
    })
  }
  next()
}
// how did this fun get the return true  value from validation req
// logic for  passing values b/n middleware i think
