import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../db/models/User'
import { CustomError } from '../middlewares/error'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

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

        res.status(201).json({ message: 'User created!' })
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
    
    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: false, secure: true, maxAge: 60 * 60 * 1000 })
    res.status(200).json({ message: 'Login senseful!' });
}

export async function getUserStatus(req: Request, res: Response) {
    res.json({
        authenticated: true,
        user: (req as any).user, // дані з токена
    })
}

export async function logout(req: Request, res: Response) {
    // res.clearCookie("token")
    // res.cookie('token2', '12', { httpOnly: true, secure: true, maxAge: 10 * 1000 })
    res.clearCookie("token")
    res.send({ message: "Logged out" })
}