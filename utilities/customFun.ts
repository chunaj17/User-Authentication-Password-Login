import { CustomValidator } from 'express-validator'
import server from '../model/model'
export const nameMatched: CustomValidator = async (value: string) => {
  const dataId = await server.findOne({ name: value })
  if (dataId) {
    throw new Error('name already exists')
  }
  return true
}
export const userMatched: CustomValidator = async (value: string) => {
  const dataId = await server.findOne({ name: value })
  if (dataId) {
    return true
  }
  throw new Error('name does not exist')
}
