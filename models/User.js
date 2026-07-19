const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      // Changed from Role to role
      type: String,
      required: true,
      default: "patient",
      enum: ["patient", "doctor"],
    },
    // Doctor-specific fields
    specialty: {
      type: String,
      required: function () {
        return (this.Role = "doctor");
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
