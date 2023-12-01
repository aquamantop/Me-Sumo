import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { TextField, ToggleButton, ToggleButtonGroup, Button, Typography, Box, Link } from '@mui/material';
import axiosInstance from "../../../../hooks/api/axiosConfig";
import { ButtonSX } from "../../../customMui/CustomMui";
import { useBookingContext } from '../../../../hooks/bookingContext';


const CustomCalendar = ({ courtId, activityId, activityName, clubId }) => {
  const { id } = useParams();
  
  clubId === null  && parseInt(id)

  const { bookingInfo, saveBookingInfo } = useBookingContext();

  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    axiosInstance.get(`booking/court_slots?clubId=${clubId}&courtId=${courtId}&activityId=${activityId}`)
      .then((response) => {
        const fechasArray =reorganizarDatos(response.data)
        setBooking(fechasArray);
        setLoading(false);
      })
      .catch((error) => setError(error));
      console.log(clubId, courtId, activityId)
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
    setSelectedSlot(null)
  };

  const availableHoursForSelectedDate = selectedDate ? booking[selectedDate] : []

  const handleHourChange = (id) => {
    setSelectedSlot(id)
  };

  const handleBooking = () => {
    const data = availableHoursForSelectedDate.find(element => element.id === selectedSlot)
    
    if (data) {
      saveBookingInfo({
        ...bookingInfo,
        selectedDate,
        selectedHour: data.startTime,
        slotId: data.id,
        clubId,
        courtId,
        activityId,
        activityName
      });
    }
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
            value={selectedSlot}
            exclusive
            size="small"
            color="secondary"
            onChange={(_, newHour) => handleHourChange(newHour)}
          >
            {selectedDate && (
              availableHoursForSelectedDate
                .flatMap((timeSlot) => {
                  const startHour = parseInt(timeSlot.startTime.split(':')[0], 10);
                  return [{ id: timeSlot.id, startHour: `${startHour}:00` }];
                })
                .sort((a, b) => a.startHour - b.startHour)
              .map((timeSlot) => {
                return (
                  <ToggleButton key={timeSlot.id} variant="outlined" value={timeSlot.id}>
                    {timeSlot.startHour}
                  </ToggleButton>
                )
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
        <Link href="/new-event">
          <Button 
            variant="contained" 
            fullWidth 
            sx={{...ButtonSX ,m:2}}
          >
            Confirmar evento
          </Button>
        </Link>
        </Box> 
    </>
  ); 
};

export default CustomCalendar;
