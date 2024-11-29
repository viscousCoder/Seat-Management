import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Container, Box, Button, Typography } from "@mui/material";
import Compartment from "./components/Compartment";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [youBooked, setYouBooked] = useState([]);
  const userId = localStorage.getItem("userId");
  const [socket, setSocket] = useState(null);

  // Initialize socket when token is available
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const newSocket = io("https://seat-management.onrender.com", {
        // const newSocket = io("http://localhost:9001", {
        query: {
          token,
        },
      });
      setSocket(newSocket);

      // Cleanup on component unmount
      return () => newSocket.close();
    }
  }, [navigate]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("seatUpdated", (updatedSeat) => {
  //       setData((prevSeats) =>
  //         prevSeats.map((seat) =>
  //           seat.seatNumber === updatedSeat.seatNumber ? updatedSeat : seat
  //         )
  //       );
  //     });

  //     // Cleanup the socket listener when the component unmounts or socket changes
  //     return () => {
  //       socket.off("seatUpdated");
  //     };
  //   }
  // }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("seatUpdated", (updatedSeat) => {
        setData((prevSeats) =>
          prevSeats.map((seat) =>
            seat.seatNumber === updatedSeat.seatNumber ? updatedSeat : seat
          )
        );
      });

      // Add the listener for the resetSeats event
      socket.on("resetSeats", () => {
        console.log("All seats have been reset.");
        fetchData(); // Refetch the data to reflect the reset state
      });

      return () => {
        socket.off("seatUpdated");
        socket.off("resetSeats"); // Clean up the listener
      };
    }
  }, [socket]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://seat-management.onrender.com/api/seats",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    setBtnClicked((prev) => !prev);
    setSelectedSeats([]);
  };

  // async function handleResetApi() {
  //   await axios.post("https://seat-management.onrender.com/api/seats");

  //   setBtnClicked((prev) => !prev);
  // }

  const handleResetSeats = () => {
    socket.emit("resetSeats", { userId });
    setBtnClicked((prev) => !prev); // This will trigger a re-render
    console.log("hii");
  };

  useEffect(() => {
    fetchData();
  }, [socket, btnClicked]); // Only run this effect when socket changes

  return (
    <Container>
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

        <Button variant="contained" color="primary" onClick={handleResetSeats}>
          Reset Seats
        </Button>
      </Box>
    </Container>
  );
};

export default App;
