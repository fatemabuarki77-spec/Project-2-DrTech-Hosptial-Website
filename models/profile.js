const mongoose = require(`mongoose`);

//schema
const profileschema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    specialty: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      enum: [junior, Senior, cheif, Consultant],
      required: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    Availability: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

//model
const Profile = mongoose.model(`Profile`, profileschema);

module.exports = Profile;
