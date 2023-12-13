import "react-image-gallery/styles/css/image-gallery.css";
import { Grid, Typography, Card, Divider } from "@mui/material";
import { useBookingContext } from '../../hooks/bookingContext';
import { useParams } from 'react-router';
import axiosInstance from "../../hooks/api/axiosConfig";
import CourtCard from "./courtCard/CourtCard";
import EventCard from "./../eventShowcase/EventCard";
import ImageGallery from "react-image-gallery";
import React, { useEffect, useState } from "react";

export const ClubInfo = ({ club }) => {
  const { id } = useParams();
  const { bookingInfo, saveBookingInfo } = useBookingContext();

  const { description, amenities, url, activities, name, neighborhood } = club

  const [eventList, setEventList] = useState([]);
    const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    saveBookingInfo({
      ...bookingInfo,
      clubName: name,
      neighborhoodName: neighborhood.name
    })
  }, [])

  useEffect(() => {
    axiosInstance.get(`booking/approved/${id}?approved=false`)
      .then((response) => {
        setEventList(response.data)
        setLoading(false)
      })
      .catch((error) => setError(error))
  }, [])


  return (
    <>
      <Grid container >
        <Grid item xs={12} md={9} p={2} sx={{ borderBottom: { xs: '2px solid #3FEBBD', md: 'none' }, borderRight: { xs: 'none', md: '2px solid #3FEBBD' } }}>
        <Typography variant="h5" color="primary.main" >Descripcion</Typography>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="body1" color="primary.main" sx={{mb:1}}>
            {description}
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={6}>
              <ImageGallery
                showThumbnails={false}
                showBullets={false}
                showFullscreenButton={false}
                showPlayButton={false}
                items={[{ srcSet: url }]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} >
                  <Card
                    sx={{
                      border: "1px solid #434242",
                      borderRadius: "5px",
                      p: 1,
                    }}>
                    <Typography variant="body1" color="primary.main">Horarios</Typography>
                    <Typography variant="body2" color="secondary.main">Lunes, Martes, Miercoles, Jueves, Viernes: 10:00 a 0:00 am</Typography>
                    <Typography variant="body2" color="secondary.main">Sabado: 10:00 a 0:00 am</Typography>
                    <Typography variant="body2" color="secondary.main">Feriados: 10:00 a 0:00 am</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} >
                  <Card
                    sx={{
                      border: "1px solid #434242",
                      borderRadius: "5px",
                      p: 1
                    }}>
                    <Typography variant="body1" color="primary.main">Servicios del Club</Typography>
                    <Grid container>
                      {amenities.map((amenitie, index) => (
                        <Grid item key={index} xs={6}>
                          <Typography variant="body2" color="secondary.main">
                            {amenitie.name}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
            <Typography variant="h5" color="primary.main" sx={{mt:2}} >Canchas y disponibilidad</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
          <Grid container spacing={1}>
            {activities.map((activity) => (
              activity.courts.sort((a, b) => a.id - b.id).map((court) => {
                return <Grid item xs={12} sm={6} key={court.id} >
                  <CourtCard court={court} activityId={activity.id} activityName={activity.name} activityType={activity.type} clubId={club.id} />
                </Grid>
              })
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} p={2}>
          {
            !loading && (
              <>
              <Typography variant="h5" color="primary.main" >Eventos del club</Typography>
              <Divider sx={{ mt: 1, mb: 1 }} />
              {eventList.length == 0 ?
                <Typography variant="body2" color="secondary.main" >Aún no hay eventos creados para este club</Typography> :
                eventList.map((event) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      key={event.id}
                      sx={{ p: 1 }}
                    >
                      <EventCard booking={event}/>
                    </Grid>        
                  )
                })
              }
              </>
            )
          }
        </Grid>
      </Grid>
    </>
  );
};