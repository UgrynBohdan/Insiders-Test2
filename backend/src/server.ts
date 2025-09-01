import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './db/db'
import app from './app'

async function start() {
    await connectDB()

    const PORT = Number(process.env.SERVER_PORT)
    const HOST = process.env.SERVER_HOST as string
    app.listen(PORT, HOST, () => {
        console.log(`Server running on http://${HOST}:${PORT}`)
    })
}

start()