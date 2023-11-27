import React from "react";
import { Card, CardContent, Typography, Box, Button, Link } from "@mui/material";
import CustomCalendar from "./customCalendar/CustomCalendar";

const CourtCard = ({ court, activityId }) => {

  const { name, court_type, inside } = court

  const field = (() => {
    switch (court_type) {
      case "CESPED_SINTETICO":
        return "Sintético";
      case "CESPED_NATURAL":
        return "Natural";
      case "CEMENTO":
        return "Cemento";
      default:
        return "N/A";
    }
  })();

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          border: "1px solid #434242",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 0 5px 5px rgb(195, 253, 116, 0.2)",
          }
        }}
      >
        <CardContent>
          <Typography variant="h6" color="primary.main">
            { name }
          </Typography>
          <Typography variant="body2" color="secondary.main">
            { field } | { inside ? "Techada" : "No Techada" }
          </Typography>
          <CustomCalendar courtId={ court.id } activityId={ activityId }/>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <Link href="" >
            <Button variant="contained" color="secondary">
              Reservar cancha
            </Button>
          </Link>
        </Box>
      </Card>
    </>
  );
};

export default CourtCard;
