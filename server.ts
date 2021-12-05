import express from 'express'
import { router } from './routes/routes'
import { connectDb } from './db/connect'
const app = express()
const port: number = 3000
app.use(express.json())
app.use('/api/v1', router)
const start = async () => {
  try {
    await connectDb()
    app.listen(port, () => {
      console.log(`server is listening on port :${port}....`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
