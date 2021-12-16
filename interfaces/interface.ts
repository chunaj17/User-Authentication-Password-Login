import { ValidationChain } from 'express-validator'
export type validBody = {
  [key: string]: ValidationChain[]
}
export interface userI {
  name: string
}
