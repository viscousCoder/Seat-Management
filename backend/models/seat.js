// const mongoose = require("mongoose");

// const seatSchema = new mongoose.Schema({
//   seatNumber: { type: Number, required: true },
//   booked: { type: Boolean, default: false },
//   pending: { type: Boolean, default: false },
//   rowNumber: { type: Number, required: true },
// });

// const Seat = mongoose.model("seat", seatSchema);

// module.exports = Seat;

const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seatNumber: { type: Number, required: true },
    booking: {
      isBooked: { type: Boolean, default: false },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    pending: {
      isPending: { type: Boolean, default: false },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    rowNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
