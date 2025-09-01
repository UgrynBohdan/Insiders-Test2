import { Request, Response } from 'express'
import { connectDB } from '../db/db'
import User from '../db/models/User'

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body

    await connectDB()
    const newUser = new User({ name, email, password })
    await newUser.save()
    res.json(newUser)
}

export async function login(req: Request, res: Response) {
    await connectDB()
    const users = await User.find()
    res.json({ users })
}