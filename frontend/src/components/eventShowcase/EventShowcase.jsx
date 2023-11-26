import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import EventCard from "./EventCard";
import { PaperSXX } from "../customMui/CustomMui";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../hooks/api/axiosConfig";


function EventShowcase({keyword}) {

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

       
  useEffect(() => {

    axiosInstance.get('/booking/approved?approved=false')
    .then((response) => {
      setBookings(response.data)
      setLoading(false)
    //   console.log(response.data)
    })
    .catch((error) => setError(error))
  }, [])


  return (
  <>
    <Container sx={{mb:2}}>
      <Paper sx={PaperSXX}>
        <Box
          sx={{
            border: "2px solid",
            borderColor: "secondary.main",
            borderRadius: "10px",
            margin: '-2px',
            position: 'relative',
            zIndex: 1,
            p: 2,
          }}
        >
          <Typography variant="h5" color="primary.main">
            Eventos que cierran en <span style={{ color: 'orange' }}>{keyword}</span> de una hora
          </Typography>
        </Box>
        <Grid container > 
          {bookings.map((booking, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ p: 2 }}
              >
                <EventCard booking={booking}/>
              </Grid>
            )}
          )}
        </Grid>
      </Paper>
    </Container>
  </>
  );
}

export default EventShowcase;
