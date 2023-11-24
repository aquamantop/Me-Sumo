import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import axios from "axios";

const CustomCalendar = ({ courtId, activityName }) => {
  const { id: clubId } = useParams();

  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/booking/court_slots?clubId=${clubId}&courtId=${courtId}&activityName=${activityName}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        const fechasArray = Object.keys(response.data).flatMap((clave) =>
          Object.keys(response.data[clave])
        );
        setBooking(fechasArray);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  console.log(booking)

  return (
    <>
      <StaticDatePicker
        sx={{
          bgcolor: "white",
          mt: 2
        }}
        shouldDisableDate={(day) => {
          return !booking.includes(day.toISOString().split('T')[0]);
       }}
      />
    </>
  );
};

export default CustomCalendar;
