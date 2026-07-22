const mongoose = require(`mongoose`);

//schema
const bookingschema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    date: {
      type: Date,
      required: true,
    },
    appttype: {
      type: String,
      required: true,
      enum: ["in-person", "telehealth"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Assigned", "Completed", "Cancelled"],
      default: "Pending",
    },
    notes: { type: String, default: "" },
    labRequests: [{ type: String }],
    customLabs: { type: String, default: "" },
    xrayRequests: [{ type: String }],
    customXrays: { type: String, default: "" },
  },

  { timestamps: true },
);

//model
const Booking = mongoose.model(`Booking`, bookingschema);

module.exports = Booking;
