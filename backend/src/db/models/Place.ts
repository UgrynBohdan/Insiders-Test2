import mongoose, { Schema, Document, Types } from "mongoose"

export interface IPlace extends Document {
    tripId: Types.ObjectId;           // посилання на Trip
    locationName: string;
    notes?: string;
    dayNumber: number;              // ціле число ≥ 1
}

const PlaceSchema = new Schema<IPlace>({
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true, index: true },
    locationName: { type: String, required: true, trim: true },
    notes: { type: String, default: "" },
    dayNumber: { type: Number, required: true, min: 1 },
})

// корисний комбінований індекс для сортування та вибірок
PlaceSchema.index({ trip: 1, dayNumber: 1, _id: 1 })

export default mongoose.model<IPlace>("Place", PlaceSchema)
