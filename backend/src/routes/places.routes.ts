import { Router } from "express"
import * as placesController from '../controllers/places.controller'

const placesRouter = Router({ mergeParams: true })

placesRouter.post('/', placesController.createPlace)

export default placesRouter