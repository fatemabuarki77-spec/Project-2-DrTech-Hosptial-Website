const mongoose = require(`mongoose`);

//schema
const bookingschema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true },
);

//model
const Booking = mongoose.model(`Booking`, bookingschema);

module.exports = Booking;
