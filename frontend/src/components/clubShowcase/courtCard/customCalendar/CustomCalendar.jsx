import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { TextField, ToggleButton, ToggleButtonGroup, Button, Typography, Box, Link } from '@mui/material';
import axiosInstance from "../../../../hooks/api/axiosConfig";
import { useBookingContext } from '../../../../hooks/bookingContext';


const CustomCalendar = ({ courtId, activityId }) => {
  const { id: clubId } = useParams();

  const { saveBookingInfo } = useBookingContext();

  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    axiosInstance.get(`booking/court_slots?clubId=${clubId}&courtId=${courtId}&activityId=${activityId}`)
      .then((response) => {
        const fechasArray =reorganizarDatos(response.data)
        setBooking(fechasArray);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  function reorganizarDatos(datosEntrada) {
    let datosSalida = [];

    for (let clave in datosEntrada) {
      if (datosEntrada.hasOwnProperty(clave)) {
        for (let fecha in datosEntrada[clave]) {
            if (datosEntrada[clave].hasOwnProperty(fecha)) {
              datosSalida[fecha] = datosEntrada[clave][fecha];
            }
        }
      }
    }
      return datosSalida;
  }

  const handleDateChange = (date) => {
    const formatDate = new Date(date).toISOString().split('T')[0];
    setSelectedDate(formatDate)
    setSelectedHour(null)
  };

  const availableHoursForSelectedDate = selectedDate ? booking[selectedDate] : []

  const handleHourChange = (hour) => {
    setSelectedHour(hour)
  };

  const handleBooking = () => {
    console.log('Fecha seleccionada:', selectedDate);
    console.log('ID Hora seleccionada:', selectedHour);
    saveBookingInfo({
      selectedDate,
      selectedHour,
      clubId,
      courtId,
      activityId
    });
  };


  return (
    <>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} label="Selecciona una fecha" />}
        shouldDisableDate={(day) => !booking[day.toISOString().split('T')[0]]}
      />
      {selectedDate && availableHoursForSelectedDate.length === 0 && (
        <Typography variant="body2" color="error">
        No hay horas disponibles para la fecha seleccionada.
        </Typography>
      )}
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
        >
          <ToggleButtonGroup
            value={selectedHour}
            exclusive
            size="small"
            color="secondary"
            onChange={(_, newHour) => handleHourChange(newHour)}
          >
            {selectedDate && (
              availableHoursForSelectedDate
                .flatMap((timeSlot) => {
                  const startHour = parseInt(timeSlot.startTime.split(':')[0], 10);
                  return [{ id: timeSlot.id, startHour }];
                })
                .sort((a, b) => a.startHour - b.startHour)
                .map((timeSlot) => (
                  <ToggleButton key={timeSlot.id} variant="outlined" value={timeSlot.startHour}>
                    {`${timeSlot.startHour}:00`}
                  </ToggleButton>
              ))
            )}
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 2,
          }}
          >
        <Link href="/new-event">
          <Button variant="contained" color="secondary" onClick={handleBooking}>
            Confirmar evento
          </Button>
        </Link>
        </Box> 
    </>
  ); 
};

export default CustomCalendar;
