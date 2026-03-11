import Flight from "../models/Flight.js";

export const createFlight = async (req, res) => {

  try {

    const flight = new Flight(req.body);

    await flight.save();

    res.status(201).json(flight);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const getFlights = async (req, res) => {

  try {

    const flights = await Flight.find();

    res.json(flights);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const updateFlight = async (req, res) => {

  try {

    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(flight);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const deleteFlight = async (req, res) => {

  try {

    await Flight.findByIdAndDelete(req.params.id);

    res.json({ message: "Flight deleted" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const searchFlights = async (req, res) => {

  try {

    const { from, to, date } = req.query;

    const query = {};

    if (from) query.from = from;
    if (to) query.to = to;

    if (date) {
      const start = new Date(date);
      const end = new Date(date);

      end.setHours(23,59,59,999);

      query.date = { $gte: start, $lte: end };
    }

    const flights = await Flight.find(query);

    res.json(flights);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

