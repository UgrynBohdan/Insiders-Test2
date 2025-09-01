import { Router } from "express"
import * as tripsController from '../controllers/trips.controller';

const tripsRouter = Router()

tripsRouter.post('/', tripsController.createNewTrip)
tripsRouter.get('/', tripsController.getUserTrips)

export default tripsRouter