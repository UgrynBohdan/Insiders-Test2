import { Router } from 'express'
import { get } from '../controllers/auth.controller'

const authRouter = Router()

authRouter.get('/', get)

export default authRouter