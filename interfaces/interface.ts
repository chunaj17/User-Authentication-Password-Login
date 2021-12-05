import { ValidationChain } from 'express-validator'
export type validBody = {
  [key: string]: ValidationChain[]
}
