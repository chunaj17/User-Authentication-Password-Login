import { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'
import users from '../model/model'
export const usersDb = async (req: Request, res: Response) => {
  const data = await users.find({})
  res.status(200).json({ data })
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
  const user = await users.findOneAndDelete({ name })
  res.status(200).json({ msg: `${name} deleted` })
}
