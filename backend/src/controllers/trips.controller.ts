import { NextFunction, Request, Response } from 'express'
import Trip from '../db/models/Trip'
import User, { IUser } from '../db/models/User'

export async function createNewTrip(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, description, startDate, endDate } = req.body
        if (startDate > endDate) {
            res.status(404).json({ message: 'Start must be no later than the finish!' })
            return
        }

        const user = await User.findOne({ _id: (req as any).user.id }) as IUser

        const newTrip = new Trip({ title, description, startDate, endDate, owner: user._id })
        await newTrip.save()

        user.trips.push(newTrip._id as any)
        await user.save()

        res.status(201).json({ message: "Trip added!", newTrip })

    } catch (err) {
        next(err)
    }
}

export async function getUserTrips(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user.id

        const allUserTrips = await Trip.find({
            $or: [
                { owner: userId },
                { collaborators: { $in: [userId] } }
            ]
        })

        res.json({ allUserTrips })

    } catch (err) {
        next(err)
    }
}

export async function getDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { tripId } = req.params
        const trip = await Trip.findOne({ _id: tripId })        

        if (!trip) {
            res.status(404).json({ message: 'Trip not found!' })
            return
        }
        
        const tripInfo = await trip.populate('places')
        res.json({ tripInfo })

    } catch (err) {
        next(err)
    }
}