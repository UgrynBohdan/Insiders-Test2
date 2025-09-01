import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { connectDB } from '../db/db'
import User from '../db/models/User'
import { CustomError } from '../middlewares/error'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY as string

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body

    await connectDB()

    const hash = await bcrypt.hash(password, 10)

    const newUser = new User({ name, email, password: hash })
    await newUser.save()
    res.status(201).json(newUser)
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body

    await connectDB()

    const row = await User.find({ email })
    const user = row[0]
    if (!user) {
        const err = new Error() as CustomError
        err.message = 'User is not found!'
        err.status = 404
        throw err
    }

    await bcrypt.compare(password, user.password).catch((e) => {
        const err = new Error() as CustomError
        err.message = 'Incorrect password!'
        err.status = 401
        throw err
    })
    
    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 })
    res.status(200).json({ message: 'Login senseful!' });
}