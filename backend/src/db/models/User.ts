import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: string
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, default: "User" }
})

export default mongoose.model<IUser>("User", UserSchema)
