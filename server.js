import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/songs", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on Successfully`));
