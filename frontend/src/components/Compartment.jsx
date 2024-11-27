/* eslint-disable react/prop-types */
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Seat from "./Seat";

export default function Compartment({ loading, data, onSeatSelect }) {
  const currentUserId = localStorage.getItem("userId");

  const rows = [];
  for (let i = 0; i < data?.length; i += 12) {
    rows.push(data.slice(i, i + 12));
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      height="100%"
      gap={2}
    >
      {!loading ? (
        <Typography variant="h6" align="center">
          Ticket Booking
        </Typography>
      ) : (
        <Typography align="center" fontWeight="bold">
          Please Wait.
        </Typography>
      )}

      <Grid
        container
        // key={rowIndex}
        spacing={1}
        sx={{
          bgcolor: "#FAFAFA",
          minHeight: "48vh",
          minWidth: "400px",
          padding: 2,
          borderRadius: "8px",
          marginBottom: 2,
          overflow: { xs: "auto", lg: "hidden" },
        }}
      >
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((item, index) => {
              const columnNumber = index;

              return (
                <Grid
                  item
                  xs={1}
                  key={item._id}
                  sx={{
                    marginRight:
                      columnNumber === 2 || columnNumber === 8 ? 4 : 0,
                    flexBasis: "7.333% !important",
                  }}
                >
                  <Seat
                    isBooked={item.booking?.isBooked || false}
                    isPending={item.pending?.isPending || false}
                    seatNumber={item.seatNumber}
                    onClick={() => onSeatSelect(item.seatNumber)}
                    currentUserId={currentUserId}
                    reservedBy={item.pending?.userId}
                  />
                </Grid>
              );
            })}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
}
