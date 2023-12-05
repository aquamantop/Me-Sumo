import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Collapse, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import axiosInstance from "../hooks/api/axiosConfig";
import { useUserContext } from '../hooks/userContext';
import { useNavigate } from 'react-router-dom';


const Bookings = () => {
  const {id} = useParams();
  const [bookings, setBookings] = useState([]);
  const { user } = useUserContext();
  const [userInfo, setUserInfo] = useState({});
  const [clubId, setClubId] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    user &&
      axiosInstance.get(`/user/search-email?email=${user.email}`)
        .then((response) => {
          setUserInfo(response.data);
          if(response.data.role === 'ROLE_CLUB'){
          const name = response.data.firstName;
          axiosInstance.get(`/club/by-name/${name}`)
          .then((response) => {
            setClubId(response.data.id);
            if(response.data.id !== parseInt(id)){
              console.log(response.data.id + "vs" + id)
              alert("No tiene permiso para acceder a esta página.");
              window.location.href = "/";
            }
          })}else{
            alert("No tiene permiso para acceder a esta página.");
            window.location.href = "/";            
          }
        })
        .catch((error) => setError(error))
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/booking/approved/${id}?approved=true`);
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchBookings();
    } else {
        alert("No tiene permiso para acceder a esta página.");
            window.location.href = "/";
    }

    
  }, [id]);

  const [expandedBookingId, setExpandedBookingId] = useState(null);

  const handleClick = () => {
    navigate(`/new-slot/${id}`);
  };

  const handleExpandBooking = (bookingId) => {
    setExpandedBookingId(bookingId === expandedBookingId ? null : bookingId);
  };

  return (
    <Container>
      <Paper>
        <Typography variant="h5" align="center" gutterBottom>
          Reservas del Club 
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Actividad</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora de inicio</TableCell>
              <TableCell>Hora de fin</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Participantes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <React.Fragment key={booking.id}>
                <TableRow>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.activityName}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.startTime}</TableCell>
                  <TableCell>{booking.endTime}</TableCell>
                  <TableCell>{booking.message}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpandBooking(booking.id)}>
                      {expandedBookingId === booking.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Collapse in={expandedBookingId === booking.id} timeout="auto" unmountOnExit>
                      <List>
                        {booking.participants.map((participant) => (
                          <ListItem key={participant.id}>
                            <ListItemText primary={`${participant.firstName} ${participant.lastName} - ${participant.email}`} />
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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <IconButton onClick={handleClick} variant="contained" color="primary">
            Horarios de turnos
          </IconButton>
      </div>
    </Container>
    
  );
};

export default Bookings;