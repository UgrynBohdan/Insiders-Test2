import { Router } from "express"
import * as tripsController from '../controllers/trips.controller';
import authMiddleware from "../middlewares/auth";
import placesRouter from "./places.routes";

const tripsRouter = Router()

tripsRouter.post('/', tripsController.createNewTrip)
tripsRouter.get('/', tripsController.getUserTrips)
tripsRouter.get('/:tripId', tripsController.getDetails)

tripsRouter.use('/:tripId/places', authMiddleware, placesRouter)

export default tripsRouter