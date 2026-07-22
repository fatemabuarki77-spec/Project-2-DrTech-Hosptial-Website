const mongoose = require(`mongoose`);

//schema
const profileschema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    specialty: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      enum: [`junior`, `Senior`, `cheif`, `Consultant`],
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
      default: true,
    },
  },
  { timestamps: true },
);

//model
const Profile = mongoose.model(`Profile`, profileschema);

module.exports = Profile;
