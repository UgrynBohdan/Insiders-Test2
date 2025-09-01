import { Router } from "express"
import * as placesController from '../controllers/places.controller'

const placesRouter = Router({ mergeParams: true })

placesRouter.post('/', placesController.createPlace)
placesRouter.put('/:placeId', placesController.updatePlace)
placesRouter.delete('/:placeId', placesController.deletePlace)

export default placesRouter