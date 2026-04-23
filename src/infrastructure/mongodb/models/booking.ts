import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    groupSize: {
      type: Number,
      required: true
    },
    returningCustomer: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: "PENDING"
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;