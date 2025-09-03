import { NextFunction, Request, Response } from "express"
import Trip, { ITrip } from "../db/models/Trip"
import Place from "../db/models/Place"
import { IUser } from "../db/models/User"

function hasRight (trip: ITrip, user: IUser) {
    // Перевіряємо, чи користувач є власником
    if (!(trip.owner.toString() === user.id)) {
        
        // Перевіряємо, чи користувач є учасником
        const isParticipant = trip.collaborators.some(collaboratorId => collaboratorId.toString() === user.id)
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

        trip.places.push(newPlace._id as any)
        await trip.save()

        res.status(201).json({ message: 'Creating successful', newPlace })
        
    } catch (err) {
        next(err)
    }
}

export async function deletePlace(req: Request, res: Response, next: NextFunction) {
    try {
        const { tripId, placeId } = req.params
        const user = (req as any).user

        // Знаходимо поїздку
        const trip = await Trip.findById(tripId)
        if (!trip) {
            return res.status(404).json({ message: "Trip not found." })
        }

        // Перевірка прав доступу
        if (!hasRight(trip, user)) {
            return res.status(403).json({ message: "You do not have access to this trip." })
        }

        // Знаходимо місце
        const place = await Place.findOne({ _id: placeId, tripId })
        if (!place) {
            return res.status(404).json({ message: "Place not found." })
        }

        // Видаляємо місце
        await place.deleteOne()

        // Прибираємо з Trip.places
        trip.places = trip.places.filter(id => id.toString() !== placeId)
        await trip.save()

        return res.status(200).json({ message: "Place deleted successfully." })
    } catch (err) {
        next(err)
    }
}

export async function updatePlace(req: Request, res: Response, next: NextFunction) {
    try {
        const { tripId, placeId } = req.params
        const { locationName, notes, dayNumber } = req.body
        const user = (req as any).user

        const trip = await Trip.findById(tripId)
        if (!trip) {
            return res.status(404).json({ message: "Trip not found." })
        }

        // Перевірка прав доступу
        if (!hasRight(trip, user)) {
            return res.status(403).json({ message: "You do not have access to this trip." })
        }

        // Знаходимо місце
        const place = await Place.findOne({ _id: placeId, tripId })
        if (!place) {
            return res.status(404).json({ message: "Place not found." })
        }

        // Валідація dayNumber
        if (dayNumber && dayNumber < 1) {
            return res.status(400).json({ message: "dayNumber must be greater than or equal to 1." })
        }

        // Оновлюємо поля
        if (locationName !== undefined) place.locationName = locationName
        if (notes !== undefined) place.notes = notes
        if (dayNumber !== undefined) place.dayNumber = dayNumber

        await place.save()

        return res.status(200).json({ message: "Place updated successfully.", place })
    } catch (err) {
        next(err)
    }
}
