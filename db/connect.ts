import { connect } from 'mongoose'
export const connectDb = async () => {
  return await connect('mongodb://127.0.0.1:27017/usersDb')
}
