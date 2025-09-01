import { Router } from "express"
import * as tripsController from '../controllers/trips.controller';
import authMiddleware from "../middlewares/auth";
import placesRouter from "./places.routes";
import { acceptInvite, invite } from "../controllers/invite.controller";

const tripsRouter = Router()

tripsRouter.post('/', authMiddleware, tripsController.createNewTrip)
tripsRouter.get('/', authMiddleware, tripsController.getUserTrips)
tripsRouter.get('/invite/accept', acceptInvite) // Прийняття запрошень
tripsRouter.get('/:tripId', authMiddleware, tripsController.getDetails)

tripsRouter.put('/:tripId', authMiddleware, tripsController.updateTrip)
tripsRouter.delete('/:tripId', authMiddleware, tripsController.deleteTrip)

tripsRouter.use('/:tripId/places', authMiddleware, placesRouter) // Доступ до place

tripsRouter.post('/:tripId/access', authMiddleware, invite) // Запросити когось


export default tripsRouter