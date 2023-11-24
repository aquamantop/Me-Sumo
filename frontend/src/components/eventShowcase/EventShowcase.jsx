import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import EventCard from "./EventCard";
import { PaperSXX } from "../customMui/CustomMui";
import React, { useEffect, useState } from "react";
import axios from "axios"
import { axiosInstance } from "../../axiosConfig";


function EventShowcase({keyword}) {

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

       
  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url: "http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/booking/",
    //   headers: {
    //     Accept: "application/json",
    //    "Content-Type": "application/json"
    //   }
    // })
    axiosInstance.get('/booking/')
    .then((response) => {
      setBookings(response.data)
      setLoading(false)
      console.log(response.data)
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
