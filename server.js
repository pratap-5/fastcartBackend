import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import connectToMogodb from "./db/connectToMongodb.js";
import protectRoute from "./middleware/protectRoute.js";
import orderRoutes from "./routes/order.routes.js";
import path from "path";

dotenv.config();

const port = process.env.PORT;
const app = express();

const __dirname = path.resolve();

app.use("/images", express.static(path.join(__dirname, "./images")));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://fastcartfrontend.onrender.com/", // Allow this origin
    credentials: true, // Allow credentials (cookies, headers)
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", protectRoute, cartRoutes);
app.use("/api/orders", protectRoute, orderRoutes);

app.listen(port, () => {
  connectToMogodb();
  console.log(`server is running at http://localhost:${port}`);
});
