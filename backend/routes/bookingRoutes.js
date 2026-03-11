import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createBooking,
  getUserBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getUserBookings);

export default router;