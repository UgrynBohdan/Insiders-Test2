import { NextFunction, Request, Response } from "express"
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken'
import Trip from "../db/models/Trip"
import User, { IUser } from "../db/models/User"


// створюємо транспортер
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export async function invite(req: Request, res: Response, next: NextFunction) {
    try {
        const { invitedEmail } = req.body
        const { tripId } = req.params
        const user = (req as any).user

        const trip = await Trip.findById(tripId)
        if (!trip) throw new Error('Trip not found!')

        const invitedUser = await User.findOne({ email: invitedEmail }) as any
        if (invitedUser && user.id.toString() === invitedUser._id.toString()) {
            throw new Error("You can't invite yourself!")
        }

        // Створення одноразового токена
        const token = jwt.sign(
            { tripId, invitedEmail },
            process.env.INVITE_SECRET_KEY as string,
            { expiresIn: '24h' } // Токен дійсний 24 години
        )

        const invitationLink = `${process.env.BACKEND_URL}/api/trips/invite/accept?token=${token}`

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: invitedEmail,
            subject: `Запрошення до співпраці над подорожжю "${trip.title}"`,
            html: `
                <p>Вітаємо!</p>
                <p>Користувач <b>${user.name}</b> запросив вас до співпраці над плануванням подорожі <b>"${trip.title}"</b>.</p>
                <p>Щоб прийняти запрошення та отримати доступ, перейдіть за цим посиланням:</p>
                <a href="${invitationLink}">Прийняти запрошення</a>
                <p>Це посилання дійсне протягом 24 годин.</p>
                <p>З повагою,<br>Команда Trip Planner</p>
            `,
        }

        await transporter.sendMail(mailOptions)
        res.json({ message: "Invite sent" })
    } catch (err) {
        next(err)
    }
}

export async function acceptInvite(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.query;
        if (!token || typeof token !== "string") {
            return res.status(400).json({ message: "Invalid token" });
        }

        const payload = jwt.verify(token, process.env.INVITE_SECRET_KEY as string) as {
            tripId: string;
            invitedEmail: string;
        };

        const trip = await Trip.findById(payload.tripId);
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        const invitedUser = await User.findOne({ email: payload.invitedEmail }) as any;
        if (!invitedUser) return res.status(404).json({ message: "User not found" });

        // додаємо користувача, якщо ще немає
        if (!trip.collaborators.some(id => id.toString() === invitedUser._id.toString())) {
            trip.collaborators.push(invitedUser._id);
            await trip.save();
        }

        res.json({ message: "You have successfully joined the trip!" });
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(400).json({ message: "Invite link expired" });
        }
        next(err);
    }
}
