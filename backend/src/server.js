import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import apiRouter from "./routes/index.js";
import { requireAuth } from "@clerk/express";

dotenv.config();
const PORT = process.env.PORT || 5002;
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5174"];
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Server Already Running.");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is live at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting the DB..", err.message);
    process.exit(1);
  });