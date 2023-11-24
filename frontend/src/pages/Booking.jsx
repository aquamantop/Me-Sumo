import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Container, Paper, Typography, Box, Button, Link, Grid } from '@mui/material'
import { PaperSXX } from '../components/customMui/CustomMui'
import axiosInstance from "../hooks/api/axiosConfig";
import { useTheme } from '@mui/system';


const Booking = () => {
  const { id } = useParams();
  const theme = useTheme();

  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    axiosInstance.get(`/booking/${id}`)
    .then((response) =>{
      const booking = response.data;
      axiosInstance.get(`/slot/getWithCourt/${booking.slotId}`)
      .then((response) => {
        const { name, url } = response.data.court.club;
        console.log("Capacity "+ response.data.capacity)
        console.log("Slot "+ booking.participants)
        console.log(response.data.capacity - booking.participants)
        const availability = response.data.capacity - booking.participants;
        const category = response.data.court.activity.name +" " + response.data.court.activity.type;
        const cardData = {
          "clubName": name,
          "bookingName":booking.name,
          "bookingDate":booking.date,
          "bookingStartTime":booking.startTime,
          "bookingAvailability": availability,
          "bookingCategory": category,
          "bookingMessage": booking.message,
          "clubUrl":url
        }
        setInfo(cardData);
        console.log(cardData);
        setLoading(false);
        return cardData;
      })
    })
    .catch((error) => setError(error)) 
  
  }, [])

  return (
  <>
    {loading && <p>Loading...</p>}
    {!loading && (
      <>
        <Header />
        <Container className="content" sx={{my:2}}>
          <Paper sx={PaperSXX}>
            <Box
              sx={{
                border: "2px solid",
                borderColor: "secondary.main",
                borderRadius: "10px",
                margin: "-2px",
                position: "relative",
                zIndex: 1,
                p: 2,
              }}
            >
              <Typography variant="h3" color="primary.main">
                <span style={{color: theme.palette.primary.main }}>Club: </span> 
                <span style={{color: theme.palette.secondary.main }}>{info.clubName}</span>
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{height:"60vh"}}>
              <Grid Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  m={2}                
                >
                  <Typography variant="h6" color="primary.main">
                    <span style={{color: theme.palette.primary.main }}>Evento: </span> 
                    <span style={{color: theme.palette.secondary.main }}>{info.bookingCategory}</span>
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    <span style={{color: theme.palette.primary.main }}>Fecha: </span>
                    <span style={{color: theme.palette.secondary.main }}>{info.bookingDate + " " + info.bookingStartTime}</span>
                  </Typography>
                  <Typography variant="h6" color="orange">
                    Quedan {info.bookingAvailability} lugares
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  m={2}                 
                >
                  <Typography variant="h6">
                    <span style={{color: theme.palette.primary.main }}>Mensaje del organizador:</span>
                    <br />
                    <span style={{color: theme.palette.secondary.main, fontStyle: 'italic', fontWeight:200 }}>{info.bookingMessage}</span>
                  </Typography>
                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={12} sx={{textAlign: "center"}}> */}
              <Grid item xs={12} sm={12} >
                <Box
                  display="flex"
                  flexDirection="column"
                  m={2}                 
                >
                  <Typography variant="h4" color="primary.main">
                    Participantes
                  </Typography>
                </Box>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} sx={{alignItems: "center"}}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    m={1} 
                    sx={{backgroundColor:"white",
                      height:"35vh",
                      borderRadius:"20px"
                    }}
                  >
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} sx={{textAlign: "center"}}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ my:2 }}
              >
                ¡Me Sumo!
              </Button>
            </Grid>
          </Paper>
        </Container>
        <Footer />
      </>
      )
    }
  </>
  );
}

export default Booking