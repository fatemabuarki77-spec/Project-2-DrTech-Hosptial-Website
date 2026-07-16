const mongoose = require(`mongoose`);

//schema
const serviceschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
//model
const Service = mongoose.model(`Service`, serviceschema);

module.exports = Service;
