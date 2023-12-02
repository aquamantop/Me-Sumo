import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Collapse, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import axiosInstance from "../hooks/api/axiosConfig";

const Bookings = ({idClub}) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/booking/approved/${idClub}?approved=true`);
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [idClub]);

  const [expandedBookingId, setExpandedBookingId] = useState(null);

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
    </Container>
  );
};

export default Bookings;