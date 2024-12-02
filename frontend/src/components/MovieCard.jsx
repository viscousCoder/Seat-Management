/* eslint-disable react/prop-types */

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Container,
  Box,
} from "@mui/material";
import { AccessTime, DateRange } from "@mui/icons-material";
import ChairIcon from "@mui/icons-material/Chair";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const MovieCard = ({ movieName, date, time, seats, seatNumber }) => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      <CardContent>
        {/* Movie Title */}
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          {movieName}
        </Typography>

        {/* Movie Information Section */}
        <Container>
          <Box sx={{ mb: 1 }}>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {" "}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <DateRange sx={{ marginRight: 1 }} />
                  {new Date(date).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <AccessTime sx={{ marginRight: 1 }} />
                  {time}
                </Typography>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {" "}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <ChairIcon sx={{ marginRight: 1 }} />
                  {seats} Seat{seats > 1 ? "s" : ""}
                </Typography>
              </Box>
              <Box>
                {" "}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <MonetizationOnIcon sx={{ marginRight: 1 }} />{" "}
                  <Box sx={{ pr: "9px" }}>${(seats * 10).toFixed(2)}</Box>
                </Typography>
              </Box>
            </Container>
          </Box>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 1,
              }}
            >
              Seat Number: {seatNumber.join(", ")}
            </Typography>
          </Grid>
        </Container>

        <Divider sx={{ margin: "10px 0" }} />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
