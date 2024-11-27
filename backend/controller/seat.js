const Seat = require("../models/seat");

// const get
async function getSeats(req, res) {
  // console.log(req.user);
  if (!req.user) {
    return res.status(400).json({ message: "You are not authorized" });
  }
  try {
    const availabelSeats = await Seat.find().sort({
      rowNumber: 1,
      seatNumber: 1,
    });
    return res.status(200).json({ availabelSeats });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//rest all
async function resetSeats(req, res) {
  try {
    await Seat.deleteMany();
    const totalRow = 12;
    const seatsPerRow = 7;
    const seats = [];
    let count = 0;
    for (let row = 1; row <= totalRow; row++) {
      const rowSeats = row === totalRow ? 80 % 7 : seatsPerRow;
      for (let seatNum = 1; seatNum <= rowSeats; seatNum++) {
        count++;
        const isBooked = false;
        const newSeat = new Seat({
          seatNumber: count,
          rowNumber: row,
          isBooked,
        });
        seats.push(newSeat);
      }
    }
    await Seat.insertMany(seats);
    return res.json({ message: "data successfully reset" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//when click for booking but niot booked just pending state

module.exports = { getSeats, resetSeats };
