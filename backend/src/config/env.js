import dotenv from "dotenv";
dotenv.config();
export const port = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI ;
export const secret = process.env.secret || "your_secret_key";
export const NODE_ENV = process.env.NODE_ENV || "devlopment";
