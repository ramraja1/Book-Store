import express from "express";
import mongoose from "mongoose";
import { Route } from "react-router-dom";
import bookroutes from "./Routes/bookroutes.js"
import cors from "cors";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/ram", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Connection Error ❌", err));

// Route
app.get("/", (req, res) => {
  res.send("I Love Myself ❤️");
});
app.use("/book",bookroutes);

// Start Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
