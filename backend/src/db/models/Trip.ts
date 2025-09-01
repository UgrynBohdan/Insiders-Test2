import mongoose, { Schema, Document } from "mongoose"

export interface ITrip extends Document {
    title: string
    description?: string
    startDate?: Date
    endDate?: Date
    owner: mongoose.Types.ObjectId
    collaborator: mongoose.Types.ObjectId[]
    places: mongoose.Types.ObjectId[]
}

const TripSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    collaborator: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    places: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
})

export default mongoose.model<ITrip>("Trip", TripSchema)
