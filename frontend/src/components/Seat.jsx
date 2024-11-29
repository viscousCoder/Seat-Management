/* eslint-disable react/prop-types */

import { Box } from "@mui/material";

export default function Seat({
  isBooked,
  isPending,
  seatNumber,
  onClick,
  reservedBy,
  currentUserId,
}) {
  const isClickable =
    !isBooked && (isPending ? reservedBy === currentUserId : true);

  return (
    <Box
      // onClick={onClick}
      onClick={isClickable ? onClick : null}
      sx={{
        width: "30px",
        height: "30px",
        bgcolor: isBooked
          ? "red"
          : isPending
          ? isClickable
            ? "blue"
            : "yellow"
          : "green",
        cursor: "pointer",
        border: "1px solid #000",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {seatNumber}
    </Box>
  );
}
