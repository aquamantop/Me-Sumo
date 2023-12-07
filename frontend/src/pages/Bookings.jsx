import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Collapse, List, ListItem, ListItemText, IconButton, Button, Grid } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { PaperSXX, BoxSX, ButtonSX } from "../components/customMui/CustomMui";
import axiosInstance from "../hooks/api/axiosConfig";
import { useUserContext } from '../hooks/userContext';
import { useNavigate } from 'react-router-dom';
import CustomLoader from "../components/CustomLoader";

const Bookings = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const { user } = useUserContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [clubId, setClubId] = useState(null);
  const [bookingsAllowed, setBookingsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    if (user) {
      axiosInstance.get(`/user/search-email?email=${user.email}`)
        .then((response) => {
          setUserInfo(response.data);
          
          if(response.data.role === 'ROLE_CLUB'){
          const name = response.data.firstName;
          axiosInstance.get(`/club/by-name/${name}`)
          .then((response) => {
            setClubId(response.data.id);
          
            if(response.data.id !== parseInt(id)){
              alert("No tiene permiso para acceder a esta página.");
              window.location.href = "/";
            }else{
              setBookingsAllowed(true);
              setIsLoading(false);
          
            }
          })}else{
            alert("No tiene permiso para acceder a esta página.");
            window.location.href = "/";            
          }
        })
        .catch((error) => setError(error))
    ;
  } else {
    alert("No tiene permiso para acceder a esta página.");
    navigate('/');
  } 
  }, []);
  
  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get(`/booking/approved/${id}?approved=true`);
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  }


useEffect(() => { 
  if (!isLoading && user && bookingsAllowed) {
    fetchBookings();
  }
   
  }, [isLoading, user, bookingsAllowed]);


  const [expandedBookingId, setExpandedBookingId] = useState(null);

  const handleClick = () => {
    navigate(`/new-slot/${id}`);
  };

  const handleExpandBooking = (bookingId) => {
    setExpandedBookingId(bookingId === expandedBookingId ? null : bookingId);
  };

  if (isLoading) {
    return <CustomLoader />;
  }


  return (
    <Container sx={{ mb: 2 }}>
      <Paper sx={PaperSXX}>
        <Box sx={BoxSX}>
          <Typography variant="h5" color="primary.main">
            Reservas del Club 
          </Typography>
          </Box>
        {/* <Typography variant="h5" align="center" gutterBottom>
        </Typography> */}
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor:'background.default'}}>  
              <TableCell><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Nombre Reserva</Typography></TableCell>
              <TableCell><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Actividad</Typography></TableCell>
              <TableCell><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Fecha</Typography></TableCell>
              <TableCell><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Hora de inicio</Typography></TableCell>
              <TableCell><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Hora de fin</Typography></TableCell>
              <TableCell><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Mensaje</Typography></TableCell>
              <TableCell><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Participantes</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <React.Fragment key={booking.id}>
                <TableRow sx={{ height: expandedBookingId === booking.id ? 'auto' : 'inherit' }}>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.activityName}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.startTime}</TableCell>
                  <TableCell>{booking.endTime}</TableCell>
                  <TableCell sx={{ overflow: 'auto'}}>{booking.message}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleExpandBooking(booking.id)}
                      disabled={booking.participants.length === 0}
                    >
                      {expandedBookingId === booking.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    {booking.participants.length}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ display: expandedBookingId === booking.id ? 'table-row' : 'none' }}>
                  <TableCell colSpan={7}>
                    <Collapse in={expandedBookingId === booking.id} timeout="auto" unmountOnExit>
                      <List>
                        {booking.participants.map((participant) => (
                          <ListItem key={participant.id} sx={{ textAlign: 'right', fontStyle:'italic' }}>
                            <ListItemText primary={ <Typography color="secondary.main" sx={{ fontSize: '14px' }}>{participant.firstName} {participant.lastName} - {participant.email}</Typography>} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Grid container m={4} justifyContent="center" alignItems="center" >
        <Button onClick={handleClick} sx={{...ButtonSX}} >
          Horarios de turnos
        </Button>
      </Grid>
    </Container>
    
  );
};

export default Bookings;