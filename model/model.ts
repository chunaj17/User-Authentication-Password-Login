import { model, Schema } from 'mongoose'
const serverSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
})
export = model('server', serverSchema)
