require('dotenv').config()
import express from 'express'
import { router } from './routes/routes'
import { connectDb } from './db/connect'
import bearerToken from 'express-bearer-token'
const app = express()
app.use(bearerToken())
const port: number = 8080
app.use(express.json())
app.use('/api/v1', router)
const start = async () => {
  try {
    if (process.env.DB_LINK === undefined)
      return console.log({ msg: 'database link undefind' })
    await connectDb(process.env.DB_LINK)
    app.listen(port, () => {
      console.log(`server is listening on port :${port}....`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
