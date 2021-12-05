import { body } from 'express-validator'
import { validBody } from '../interfaces/interface'
import { nameMatched, userMatched } from '../utilities/customFun'
export const rules = (value: string) => {
  const guide: validBody = {
    validateBoth: [
      body('name').custom(nameMatched).isString(),
      body('password').isAlphanumeric(),
    ],
    validLogin: [
      body('name').isString().custom(userMatched),
      body('password').isAlphanumeric(),
    ],
  }
  return guide[value]
}
