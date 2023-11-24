import { Box, Typography, Card, CardContent, CardMedia, Button, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../hooks/api/axiosConfig";

function EventCard({ booking }) {

  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // console.log(booking.slotId)
    axiosInstance.get(`/slot/getWithCourt/${booking.slotId}`)
    .then((response) => {
      const { name, url } = response.data.court.club;
    //   console.log(response.data.capacity)
    //   console.log(booking.participants)
    //   console.log(response.data.capacity - booking.participants)
      const availability = response.data.capacity - booking.participants;
      const cardData = {
        "clubName": name,
        "bookingName":booking.name,
        "bookingDate":booking.date,
        "bookingStartTime":booking.startTime,
        "bookingAvailability": availability,
        "clubUrl":url
      }
      setInfo(cardData);
    //   console.log(cardData);
      return cardData;
    })
    .catch((error) => setError(error)) 

  }, [])

  return (
  <>
    <Card 
      variant="outlined" 
      sx={{
        border: "1px solid #434242",
        transition: 'box-shadow 0.3s',
       '&:hover':{
          boxShadow: '0 0 5px 5px rgb(195, 253, 116, 0.2)'
        }
      }}
    >
    <CardContent>
      <Typography variant="h6" color="primary.main">
        Club: {info.clubName}
      </Typography>
      <Typography variant="h6" color="primary.main">{info.bookingName}</Typography>
      <Typography variant="body2" color="secondary.main">Fecha: {info.bookingDate}</Typography>
      <Typography variant="body2" color="secondary.main">Inicio: {info.bookingStartTime}</Typography>
      <Typography variant="body2" color="secondary.main">
        Lugares Disponibles: {info.bookingAvailability} 
      </Typography>
    </CardContent>
    <CardMedia
      component="img"
      alt="Imagen del Evento"
      height="200"
      image={info.clubUrl}
    />
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        mb: 2,
      }}
    >
      <Link href={`/event/${booking.id}`} >
        <Button variant="contained" color="secondary">
          Ver Detalles
        </Button>
      </Link>
    </Box>
    </Card>
  </>
  );
}

export default EventCard;