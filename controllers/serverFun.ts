import { Request, Response } from 'express'
require('dotenv').config()
import { JwtPayload, sign, verify, VerifyErrors } from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'
import users from '../model/model'
import { userI } from '../interfaces/interface'
let refeshTokens: string[] = []
export const usersDb = async (req: Request, res: Response) => {
  const authHeader: string | undefined = req.headers['authorization']
  
  
  const token: string | undefined = authHeader && authHeader.split(' ')[1]
  if (token === undefined) return res.sendStatus(403)
  verify(token, process.env.ACCESS_TOKEN as string, async (err, user) => {
    if (err) return res.sendStatus(403)
    if (user === undefined) return res.sendStatus(500)
    const data = await users.findOne({ name: user.name })
    res.status(200).json({ data })
  })
}
export const signUp = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const hashedPassword = await hash(password, 10)
  const data = await users.create({ name, password: hashedPassword })
  res.status(200).json({ msg: 'user created succesfully' })
}
export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const user = await users.findOne({ name })
  if (user) {
    try {
      if (await compare(password, user.password)) {
        try {
          const username = name
          const user: userI = { name: username }
          const accessToken: string = getAccessToken(user)
          const refershToken: string = sign(
            user,
            process.env.REFERSH_TOKEN as string
          )
          refeshTokens.push(refershToken)
          res.status(200).json({
            msg: `wellcome ${user.name}`,
            accessToken: accessToken,
            refershToken: refershToken,
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        return res.status(400).json({ msg: `password incorrect` })
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.status(404).json({ msg: `could not find name` })
  }
}
export const delUser = async (req: Request, res: Response) => {
  const { name } = req.body
  const user = await users.findOneAndDelete({ name })
  res.status(200).json({ msg: `${name} deleted` })
}
function getAccessToken(user: userI) {
  return sign(user, process.env.ACCESS_TOKEN as string, { expiresIn: '20s' })
}
export const refershToken = async (req: Request, res: Response) => {
  const token = req.body.token
  if (token == null) return res.sendStatus(401)
  if (!refeshTokens.includes(token)) return res.sendStatus(403)
  verify(
    token,
    process.env.REFERSH_TOKEN as string,
    (err: VerifyErrors | null, user: JwtPayload | undefined) => {
      if (err) return res.sendStatus(403)
      if (user === undefined) return res.sendStatus(403)
      const accessToken = getAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    }
  )
}
export const logout = (req: Request, res: Response) => {
  if (!refeshTokens.includes(req.body.token)) return res.sendStatus(403)
  refeshTokens = refeshTokens.filter((token) => token !== req.body.token)
  res.json({ msg: 'token removed' })
}
