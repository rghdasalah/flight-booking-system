import express from "express";
import {
  createFlight,
  getFlights,
  updateFlight,
  deleteFlight,
  searchFlights
} from "../controllers/flightController.js";

const router = express.Router();

router.post("/", createFlight);
router.get("/", getFlights);
router.get("/search", searchFlights);
router.put("/:id", updateFlight);
router.delete("/:id", deleteFlight);

export default router;