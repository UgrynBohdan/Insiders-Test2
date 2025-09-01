import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as errorMiddleware from "./middlewares/error"
import loggerMiddleware from "./middlewares/logger"
import authRouter from "./routes/auth.routes"
import tripsRouter from './routes/trips.routes'
import authMiddleware from './middlewares/auth'

const app = express()
app.use(express.json())

app.use(cookieParser())
app.use(cors())

app.use(loggerMiddleware)

app.use('/api/auth', authRouter)
app.use('/api/trips', authMiddleware, tripsRouter)

app.use(errorMiddleware.notFoundMiddleware)
app.use(errorMiddleware.errorMiddleware)

export default app