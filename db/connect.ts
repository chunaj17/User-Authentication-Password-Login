import { connect } from 'mongoose'
export const connectDb = async (db: string) => {
  return await connect(db)
}
