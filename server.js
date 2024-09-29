import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser";
import connectToMogodb from "./db/connectToMongodb.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;
const app = express();


app.use(cors({
  origin: 'https://fastcartfrontend.onrender.com',  // Allow only requests from this origin
  credentials: true          // Allow credentials 
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/", authRoutes);
app.use("/api/", taskRoutes);

app.listen(port, () => {
  connectToMogodb();
  console.log(`server is running at http://localhost:${port}`);
});
