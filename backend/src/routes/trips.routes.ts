import { Router } from "express"
import * as tripsController from '../controllers/trips.controller';
import authMiddleware from "../middlewares/auth";
import placesRouter from "./places.routes";
import { acceptInvite, invite } from "../controllers/invite.controller";

const tripsRouter = Router()

tripsRouter.post('/', authMiddleware, tripsController.createNewTrip)
tripsRouter.get('/', authMiddleware, tripsController.getUserTrips)
tripsRouter.get('/:tripId', authMiddleware, tripsController.getDetails)

tripsRouter.post('/:tripId/access', authMiddleware, invite)
tripsRouter.get("/invite/accept", acceptInvite)

tripsRouter.use('/:tripId/places', authMiddleware, placesRouter)

export default tripsRouter