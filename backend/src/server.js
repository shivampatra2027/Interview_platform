import http from "http";
import app from "./app.js";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/db.js";

const server = http.createServer(app);
const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
