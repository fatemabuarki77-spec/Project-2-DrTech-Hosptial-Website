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
      ref: "User",
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
    consultationNotes: { type: String, default: " " },
    requestedServices: [String], // e.g., ['lab test', 'imaging', 'referral']
  },
  { timestamps: true },
);

//model
const Booking = mongoose.model(`Booking`, bookingschema);

module.exports = Booking;
