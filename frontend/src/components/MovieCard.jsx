// /* eslint-disable react/prop-types */

// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Divider,
//   Container,
// } from "@mui/material";
// import { AccessTime, DateRange } from "@mui/icons-material";
// import ChairIcon from "@mui/icons-material/Chair";

// const MovieCard = ({ movieName, date, time, seats, price, seatNumber }) => {
//   return (
//     <Card
//       sx={{
//         // maxWidth: 345,
//         width: "100%",
//         borderRadius: 2,
//         boxShadow: 3,
//         backgroundColor: "#f5f5f5",
//       }}
//     >
//       <CardContent>
//         {/* Movie Title */}
//         <Typography
//           variant="h5"
//           component="div"
//           align="center"
//           sx={{ fontWeight: "bold", marginBottom: 2 }}
//         >
//           {movieName}
//         </Typography>

//         {/* Movie Information Section */}
//         <Container>
//           <Grid container spacing={2}>
//             {/* Date */}
//             <Grid item xs={6}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ display: "flex", alignItems: "center" }}
//               >
//                 <DateRange sx={{ marginRight: 1 }} />
//                 {new Date(date).toLocaleDateString()}
//               </Typography>
//             </Grid>

//             {/* Time */}
//             <Grid item xs={6}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ display: "flex", alignItems: "center" }}
//               >
//                 <AccessTime sx={{ marginRight: 1 }} />
//                 {time}
//               </Typography>
//             </Grid>

//             {/* Number of Seats */}
//             <Grid item xs={6}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ display: "flex", alignItems: "center" }}
//               >
//                 <ChairIcon sx={{ marginRight: 1 }} />
//                 {seats} Seat{seats > 1 ? "s " : " "}
//               </Typography>
//             </Grid>

//             {/* Price */}
//             <Grid item xs={6}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ fontWeight: "bold" }}
//               >
//                 ${price}
//               </Typography>
//             </Grid>

//             <Grid item xs={6}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Seat Number {seatNumber.join(", ")}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Container>

//         <Divider sx={{ margin: "10px 0" }} />
//       </CardContent>
//     </Card>
//   );
// };

// export default MovieCard;

/* eslint-disable react/prop-types */

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Container,
} from "@mui/material";
import { AccessTime, DateRange } from "@mui/icons-material";
import ChairIcon from "@mui/icons-material/Chair";

const MovieCard = ({ movieName, date, time, seats, price, seatNumber }) => {
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
          <Grid container spacing={2}>
            {/* First Row: Date and Time */}
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
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
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
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
            </Grid>

            {/* Second Row: Seat and Price */}
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
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
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                ${price}
              </Typography>
            </Grid>

            {/* Last Row: Seat Numbers (Centered) */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center", // Ensures text is centered in this row
                  marginBottom: 1,
                }}
              >
                Seat Number: {seatNumber.join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Divider sx={{ margin: "10px 0" }} />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
