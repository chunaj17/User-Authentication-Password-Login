import { Router } from 'express'
import { delUser, login, signUp, usersDb } from '../controllers/serverFun'
import { validateReq } from '../validators/validationResult'
import { rules } from '../validators/validationRule'
const router = Router()
router
  .route('/users')
  .get(usersDb)
  .post(rules('validateBoth'), validateReq, signUp)
  .delete(delUser)
router.route('/users/login').post(rules('validLogin'), validateReq, login)
export { router }
