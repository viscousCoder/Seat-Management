import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Container,
  Box,
  Button,
  Typography,
  Dialog,
  Backdrop,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import Compartment from "./components/Compartment";
import { useNavigate } from "react-router-dom";
import "./App.css";
// import axios from "axios";
import MovieCard from "./components/MovieCard";

const App = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [youBooked, setYouBooked] = useState([]);
  const userId = localStorage.getItem("userId");
  const [socket, setSocket] = useState(null);
  const [open, setOpen] = useState(false);

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
        fetchData();
      });

      return () => {
        socket.off("seatUpdated");
        socket.off("resetSeats");
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

  const handleResetSeats = () => {
    socket.emit("resetSeats", { userId });
    setBtnClicked((prev) => !prev);
    console.log("hii");
  };

  useEffect(() => {
    fetchData();
  }, [socket, btnClicked]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
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

        {/* <Box mt={3} textAlign="center">
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Button onClick={handleOpen} variant="contained" color="primary">
              Your booked tickets
            </Button>
            <Backdrop open={open} sx={{ zIndex: 0 }} />
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth
              sx={{
                "& .MuiDialog-paper": {
                  backdropFilter: "blur(10px)", // Apply blur effect to the background
                },
              }}
            >
              <DialogTitle align="center">Your Movie Ticket</DialogTitle>
              <DialogContent sx={{ boxSizing: "border-box", width: "100%" }}>
                <MovieCard
                  movieName="Guardians of the Galaxy Vol. 3"
                  date="2024-12-15"
                  time="7:00 PM"
                  seats={youBooked.length}
                  seatNumber={youBooked}
                  price={15.99}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
        <Box mt={3} textAlign="center">
          <Typography variant="h6">To reset all the seats</Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleResetSeats}
          >
            Reset Seats
          </Button>
        </Box> */}
        <Box>
          <Grid container spacing={3} justifyContent="center" mt={3}>
            {/* Seat Selection Summary */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    You have selected {selectedSeats.length} seat
                    {selectedSeats.length > 1 ? "s" : ""}
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    Total Price: ${selectedSeats.length * 10}
                  </Typography>
                  <Box mt={2} textAlign="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBookSeats}
                      disabled={selectedSeats.length === 0}
                      sx={{
                        width: "200px",
                        borderRadius: 2,
                        boxShadow: 2,
                        "&:hover": {
                          backgroundColor: "#0080ff",
                        },
                      }}
                    >
                      Book Seats
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Reset Seats and Show Booked Tickets */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                spacing={2}
              >
                {/* Show Booked Tickets Button */}
                {youBooked && youBooked?.length !== 0 && (
                  <Button
                    variant="contained"
                    backgroundColor="#1876d3"
                    onClick={handleOpen}
                    sx={{
                      width: "200px",
                      marginBottom: 2,
                      borderRadius: 2,
                      boxShadow: 2,
                      "&:hover": {
                        backgroundColor: "#0080ff",
                      },
                    }}
                  >
                    Your Tickets
                  </Button>
                )}

                {/* Reset Seats Button */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleResetSeats}
                  sx={{
                    width: "200px",
                    borderRadius: 2,
                    boxShadow: 2,
                    "&:hover": {
                      backgroundColor: "#ff1744",
                    },
                  }}
                >
                  Reset Seats
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Booked Tickets Dialog */}
        {youBooked && youBooked?.length !== 0 && (
          <Backdrop open={open} sx={{ zIndex: 0 }} />
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              backdropFilter: "blur(10px)", // Apply blur effect to the background
            },
          }}
        >
          <DialogTitle align="center">Your Movie Ticket</DialogTitle>
          <DialogContent sx={{ boxSizing: "border-box", width: "100%" }}>
            <MovieCard
              movieName="Guardians of the Galaxy Vol. 3"
              date="2025-01-15"
              time="7:00 PM"
              seats={youBooked.length}
              seatNumber={youBooked}
              price={15.99}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default App;
