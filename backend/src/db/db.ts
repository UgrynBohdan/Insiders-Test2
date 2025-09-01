import mongoose from "mongoose"

const uri = process.env.MONGODB_URL as string

export async function connectDB() {
    try {
        await mongoose.connect(uri)
        console.log("✅ MongoDB connected with Mongoose")
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
        process.exit(1)
    }
}
