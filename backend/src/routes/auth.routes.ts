import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth'

const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/status', authMiddleware, authController.getUserStatus)

authRouter.post("/logout", authMiddleware, authController.logout)

export default authRouter