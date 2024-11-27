import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Container, Box, Button, Typography } from "@mui/material";
import Compartment from "./components/Compartment";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

const socket = io("http://localhost:9001", {
  query: {
    token: localStorage.getItem("token"),
  },
});

const App = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [youBooked, setYouBooked] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
    socket.on("seatUpdated", (updatedSeat) => {
      setData((prevSeats) =>
        prevSeats.map((seat) =>
          seat.seatNumber === updatedSeat.seatNumber ? updatedSeat : seat
        )
      );
    });

    return () => {
      socket.off("seatUpdated");
    };
  }, [btnClicked]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9001/api/seats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          name: "Aditya",
        },
      });
      const result = await response.json();

      const availableSeats = result.availabelSeats || [];

      const pendingSeats = availableSeats.filter(
        (seat) => seat.pending.isPending && seat.pending.userId === userId
      );
      const bookedSeats = availableSeats.filter(
        (seat) => seat.booking.isBooked && seat.booking.userId === userId
      );

      setSelectedSeats(pendingSeats.map((seat) => seat.seatNumber));
      setYouBooked(bookedSeats.map((seat) => seat.seatNumber));

      setData(availableSeats);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatNumber)) {
        socket.emit("setAvailable", { seatNumber, userId });
        return prevSelected.filter((seat) => seat !== seatNumber);
      } else {
        socket.emit("setPending", { seatNumber, userId });
        return [...prevSelected, seatNumber];
      }
    });
  };

  const handleBookSeats = () => {
    selectedSeats.forEach((seatNumber) => {
      socket.emit("bookSeat", { seatNumber, userId });
    });
    console.log("hiiii");
    setBtnClicked((prev) => !prev);

    setSelectedSeats([]);
  };

  async function handleResetApi() {
    await axios.post("http://localhost:9001/api/seats");
    setBtnClicked((prev) => !prev);
    // const data = await axios.post("http://localhost:9001/api/seats");
    // console.log(data.data.message);
  }

  return (
    <Container>
      {/* <Box
        sx={{
          width: "100%",
          height: "calc(100rem - 81rem)",
          bgcolor: "gray",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        Screen
      </Box> */}

      <Box
        className="screen"
        sx={{ width: "100%", textAlign: "center", alignContent: "center" }}
      >
        <Typography variant="h3">Movie</Typography>
      </Box>
      <Compartment
        data={data}
        loading={loading}
        onSeatSelect={handleSeatSelect}
      />

      <Box mt={3} textAlign="center">
        <Typography variant="h6">
          You have selected {selectedSeats.length} seats.
        </Typography>
        <Typography variant="body1">
          Total Price: {selectedSeats.length * 10}$
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleBookSeats}
          disabled={selectedSeats.length === 0}
        >
          Book Seats
        </Button>
      </Box>
      {youBooked && youBooked?.length !== 0 && (
        <Box>
          <Typography>You booked total {youBooked.length} seats</Typography>
          <Typography> Your seat number are {youBooked.join(", ")}</Typography>
        </Box>
      )}
      <Box mt={3} textAlign="center">
        <Typography variant="h6">To reset all the seats</Typography>

        <Button variant="contained" color="primary" onClick={handleResetApi}>
          Reset Seats
        </Button>
      </Box>
    </Container>
  );
};

export default App;
