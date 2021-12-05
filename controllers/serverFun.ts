import { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'
import server from '../model/model'
export const usersDb = async (req: Request, res: Response) => {
  const data = await server.find({})
  res.status(200).json({ data })
}
export const signUp = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const hashedPassword = await hash(password, 10)
  const data = await server.create({ name, password: hashedPassword })
  res.status(200).json({ msg: 'login data created succesfully' })
}
export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const user = await server.findOne({ name })
  if (user) {
    try {
      if (await compare(password, user.password)) {
        return res.status(200).json({ msg: `wellcome ${user.name}` })
      } else {
        return res.status(400).json({ msg: `password incorrect` })
      }
    } catch (error) {}
  } else {
    return res.status(404).json({ msg: `could not find name` })
  }
}
export const delUser = async (req: Request, res: Response) => {
  const { name } = req.body
  const user = await server.findOneAndDelete({ name })
  res.status(200).json({ msg: `${name} deleted` })
}
