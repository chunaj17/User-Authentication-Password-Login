import { Router } from 'express'
import {
  delUser,
  login,
  logout,
  refershToken,
  signUp,
  usersDb,
} from '../controllers/serverFun'
import { validateReq } from '../validators/validationResult'
import { rules } from '../validators/validationRule'
const router = Router()
router
  .route('/users')
  .get(usersDb)
  .post(rules('validateBoth'), validateReq, signUp)
  .delete(delUser)
router.route('/users/login').post(rules('validLogin'), validateReq, login)
router.route('/newtoken').post(refershToken)
router.route('/logout').post(logout)
export { router }
