import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Container, Paper, Typography, Box, Button, Link, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { PaperSXX } from '../components/customMui/CustomMui'
import axiosInstance from "../hooks/api/axiosConfig";
import { useTheme } from '@mui/system';
import { ButtonSX } from "../components/customMui/CustomMui";
import { CenterFocusStrong } from '@mui/icons-material';
import { useUserContext } from '../hooks/userContext'
import BoxMessage from '../components/Message'

const Booking = () => {
  const { id } = useParams();
  const theme = useTheme();

  const { user } = useUserContext();

  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const participants = ["Juampi","Fran","Nahue","Noe","Fede","Lean","Maru"]

  const okMessage = '¡Sumado!\nYa estás participando ;D';
  const noOkMessage = '¡Hola!\nTenés que estar logueado para sumarte al evento!';

  // const handleButtonClick = () => {
  //   if (user) {
  //     console.log('Usuario logueado:', user);
  //   } else {
  //     console.log('Usuario no logueado');
  //   }
  // };


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };  

  useEffect(() => {
    axiosInstance.get(`/booking/${id}`)
    .then((response) =>{
      const booking = response.data;
      axiosInstance.get(`/slot/getWithCourt/${booking.slotId}`)
      .then((response) => {
        const { name, url } = response.data.court.club;
        // console.log("Capacity "+ response.data.capacity)
        // console.log("Slot "+ booking.participants)
        // console.log(response.data.capacity - booking.participants)
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
        // console.log(cardData);
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
        <Container className="content" sx={{my:0}}>
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
              <Typography variant="h5" color="primary.main">
                <span style={{color: theme.palette.primary.main }}>Club: </span> 
                <span style={{color: theme.palette.primary.main }}>{info.clubName}</span>
              </Typography>
            </Box>
            <Grid container spacing={2} >
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
                  <Typography variant="h6" color="#FCBA7D">
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
                    <span style={{color: "white" , fontStyle: 'italic', fontWeight:200 }}>{info.bookingMessage}</span>
                  </Typography>
                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={12} >
                <Box
                  display="flex"
                  flexDirection="column"
                  m={2}
                  marginTop={-5}                 
                >
                  <Typography variant="h6" color="primary.main">
                    Participantes
                  </Typography>
                </Box>
              </Grid>
              <Typography variant="h6" color="primary.main">
                    Participantes
                  </Typography> */}
              <Grid item xs={12} sm={12} sx={{ textAlign: 'center', display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
                <Typography variant="h6" color="primary.main">
                    Participantes
                </Typography>
                <TableContainer component={Paper} sx={{ width: '50%', maxHeight: '250px', overflowY: 'auto', borderRadius:'20px', background:'none' }}>
                    <Table>
                      <TableHead>
                      <TableRow>
                        {/* <TableCell> */}
                        <TableCell sx={{ fontSize: '14px', position: 'sticky', top: 0, background: theme.palette.background.default }}>
                          <Typography variant="h6" color="secondary.main" sx={{fontSize:'16px'}} >
                            Orden
                          </Typography>
                        </TableCell>
                        {/* <TableCell> */}
                        <TableCell sx={{ fontSize: '14px', position: 'sticky', top: 0, background: theme.palette.background.default }}>
                          <Typography variant="h6" color="secondary.main" sx={{fontSize:'16px'}}>
                            Nombre
                          </Typography>
                        </TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                        {participants.map((user, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} sx={{textAlign: "center"}}>
            <Button 
              variant="contained"
              color="background"
              fullWidth
              onClick={() => user ? showMessage(okMessage) : showMessage(noOkMessage)}
              sx={{ ...ButtonSX }}
            >
              ¡Me Sumo!
            </Button>
            <BoxMessage
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
            />
            </Grid>
          </Paper>
        </Container>
      </>
      )
    }
  </>
  );
}

export default Booking