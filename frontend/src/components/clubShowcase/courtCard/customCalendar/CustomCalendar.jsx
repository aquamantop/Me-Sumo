import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { Button } from "@mui/material";
import axiosInstance from "../../../../hooks/api/axiosConfig";


const CustomCalendar = ({ courtId, activityId }) => {
  const { id: clubId } = useParams();

  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`booking/court_slots?clubId=${clubId}&courtId=${courtId}&activityId=${activityId}`)
      .then((response) => {
        /* const fechasArray = Object.keys(response.data).flatMap((clave) =>
          Object.keys(response.data[clave])
        ); */
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

  const availableHoursForSelectedDate = selectedDate ? booking[selectedDate] : [];


  return (
    <>
      <StaticDatePicker
        sx={{
          bgcolor: "rgb(255,255,255,0.1)",
          mt: 2
        }}
        shouldDisableDate={(day) => {
          return !booking[day.toISOString().split('T')[0]];
        }}
      />
      <Button variant="outlined">9:00</Button>
    </>
  );  
};

export default CustomCalendar;
