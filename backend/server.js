import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect("mongodb://localhost:27017/flight-booking")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Flight Booking API running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/protected", authMiddleware, (req, res) => {

  res.json({
    message: "You accessed a protected route",
    user: req.user
  });

});

app.use("/api/flights", flightRoutes);

app.use("/api/bookings", bookingRoutes);