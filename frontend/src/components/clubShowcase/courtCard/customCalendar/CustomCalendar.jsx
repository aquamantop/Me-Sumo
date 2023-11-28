import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { TextField, ToggleButton, ToggleButtonGroup, Button, Typography, Box } from '@mui/material';
import axiosInstance from "../../../../hooks/api/axiosConfig";


const CustomCalendar = ({ courtId, activityId }) => {
  const { id: clubId } = useParams();

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

  const handleBookAppointment = () => {
    console.log('Fecha seleccionada:', selectedDate);
    console.log('Hora seleccionada:', selectedHour);
    // Agrega tu lógica de reserva aquí
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
                availableHoursForSelectedDate.map((timeSlot) => {
                  const startHour =  parseInt(timeSlot.startTime.split(':')[0], 10);
                  const endHour =  parseInt(timeSlot.endTime.split(':')[0], 10);
                  const hoursRange = Array.from({ length: endHour - startHour + 1 }, (_, index) => `${startHour + index}:00`);

                  return hoursRange.map((hour) => (
                    <ToggleButton key={hour} variant="outlined" value={hour}>
                      {hour}
                    </ToggleButton>
                  ));
                })
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
          <Button variant="contained" color="secondary" onClick={handleBookAppointment}>
            Reservar cancha
          </Button>
        </Box> 
    </>
  ); 
};

export default CustomCalendar;
