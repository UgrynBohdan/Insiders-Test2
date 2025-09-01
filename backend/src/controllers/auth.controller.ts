import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { connectDB } from '../db/db'
import User from '../db/models/User'
import { CustomError } from '../middlewares/error'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY as string

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body

        const existing = await User.findOne({ email });
        if (existing) {
            const err = new Error('User already exists') as CustomError
            err.status = 400
            throw err
        }

        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hash })
        
        await newUser.save()

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const err = new Error('User not found') as CustomError
        err.status = 404
        throw err
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        const err = new Error('Incorrect password') as CustomError
        err.status = 401
        throw err
    }
    
    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 })
    res.status(200).json({ message: 'Login senseful!' });
}