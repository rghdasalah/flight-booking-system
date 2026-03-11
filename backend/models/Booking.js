import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true
  },

  bookingDate: {
    type: Date,
    default: Date.now
  },

  numberOfSeats: {
    type: Number,
    default: 1
  },

  totalPrice: {
    type: Number
  },

  status: {
    type: String,
    default: "confirmed"
  }

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);