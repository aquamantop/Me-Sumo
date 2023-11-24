import { Box, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import eventoImagen from "../../assets/club-field.png"
import React, { useEffect, useState } from "react";
import axios from "axios"
import axiosInstance from "../../hooks/api/axiosConfig";

function EventCard({ booking }) {

  const [clubs, setClubs] = useState([]);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url: "http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/club/",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    // })

    // const response = axiosInstance.get('/slot/');
    // const slotIds = response.data.map(slot => slot.id);
    // console.log(slotIds);

    axiosInstance.get('/club/')
    .then((response) => {
      setClubs(response.data)
      setLoading(false)
    })
    .catch((error) => setError(error))

    // axios({
    //   method: "GET",
    //   url: "http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/slot/",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    // })
    axiosInstance.get('/slot/')
    .then((response) => {
      setSlots(response.data)
      setLoading(false)
      console.log(response.data)
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
        Club: Deportivo Test FC
      </Typography>
      <Typography variant="h6" color="primary.main">{booking.name}</Typography>
      <Typography variant="body2" color="secondary.main">Fecha: {booking.date}</Typography>
      <Typography variant="body2" color="secondary.main">Inicio: {booking.startTime}</Typography>
      <Typography variant="body2" color="secondary.main">
        Lugares Disponibles: {booking.participants} 
      </Typography>
    </CardContent>
    <CardMedia
      component="img"
      alt="Imagen del Evento"
      height="200"
      image={eventoImagen}
    />
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        mb: 2,
      }}
    >
      <Button variant="contained" color="secondary">
        Ver Detalles
      </Button>
    </Box>
    </Card>
  </>
  );
}

export default EventCard;
