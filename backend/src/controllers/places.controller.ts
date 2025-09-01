import { NextFunction, Request, Response } from "express"
import Trip, { ITrip } from "../db/models/Trip"
import Place from "../db/models/Place"
import { IUser } from "../db/models/User"

function hasRight (trip: ITrip, user: IUser) {
    // Перевіряємо, чи користувач є власником
    if (!trip.owner === user.id) {
        // Перевіряємо, чи користувач є учасником
        const isParticipant = trip.collaborator.some(participantId => participantId === user.id)
        if (!isParticipant) {
            return false
        }
    }
    return true
}

export async function createPlace(req: Request, res: Response, next: NextFunction) {
    try {
        const { locationName, dayNumber, notes } = req.body
        const { tripId } = req.params
        const user = (req as any).user
        const trip = await Trip.findById(tripId)

        if (dayNumber < 1) {
            res.status(401).json({ message: 'dayNumber must be greater than 1!' })
            return
        }

        if (!trip) {
            res.status(404).json({ message: 'Trip not found.' })
            return
        }

        // Перевіряємо, чи користувач є власником
        if (!hasRight(trip, user)) {
            res.status(404).json({ message: 'You do not have access to this trip.' })
            return
        }

        const newPlace = new Place({ tripId, locationName, notes, dayNumber })
        await newPlace.save()

        res.status(201).json({ message: 'Creating successful', newPlace })
        
    } catch (err) {
        next(err)
    }
}

export async function deletePlace(req: Request, res: Response, next: NextFunction) {
    try {
        const { placeId } = req.body
        
    } catch (err) {
        next(err)
    }
}