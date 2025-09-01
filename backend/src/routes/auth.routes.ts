import { Router } from 'express'
import * as authController from '../controllers/auth.controller'

const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.get('/login', authController.login)

export default authRouter