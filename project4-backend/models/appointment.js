const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
      },
    date: {
      type: Date,
      required: true,
    },
    time:{
        type: String,
        required: true,
    },
    service: {
      type: String,
      required: true,
      enum: ["cut", "color", "treatment"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "completed"],
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
