import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js"

import connectToMogodb from "./db/connectToMongodb.js";


import path from "path";

dotenv.config();

const port = process.env.PORT;
const app = express();

const __dirname = path.resolve();



app.use(express.json());

app.use("/api/", authRoutes);
app.use("/api/", taskRoutes);

app.listen(port, () => {
  connectToMogodb();
  console.log(`server is running at http://localhost:${port}`);
});
