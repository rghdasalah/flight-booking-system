import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

export const createBooking = async (req, res) => {

  try {

    const { flightId, numberOfSeats } = req.body;

    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    if (flight.availableSeats < numberOfSeats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    flight.availableSeats -= numberOfSeats;
    await flight.save();

    const booking = new Booking({
      user: req.user.id,
      flight: flightId,
      numberOfSeats,
      totalPrice: numberOfSeats * flight.price
    });

    await booking.save();

    res.status(201).json(booking);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const getUserBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({ user: req.user.id })
      .populate("flight");

    res.json(bookings);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

