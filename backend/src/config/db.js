import mongoose from "mongoose";
import NODE_ENV from "./env.js";

export const connectDb = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDb database connection successfull!");
    } catch (error) {
        console.log("Some Error is created during mongoDb Conneciton.."+error);
    }
}

