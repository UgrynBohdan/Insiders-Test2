import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import * as errorMiddleware from './middlewares/error'
import loggerMiddleware from './middlewares/logger'
import authRouter from './routes/auth.routes'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors())

app.use(loggerMiddleware)

app.use('/api/auth', authRouter)

app.use(errorMiddleware.notFoundMiddleware)
app.use(errorMiddleware.errorMiddleware)

const PORT = Number(process.env.SERVER_PORT)
const HOST = process.env.SERVER_HOST as string
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})