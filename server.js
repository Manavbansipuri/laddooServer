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
    origin: ["https://storied-otter-59358c.netlify.app/", "http://localhost:3001"],
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type",
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/songs", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
