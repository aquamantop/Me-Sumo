import React, { useEffect } from "react";
import { Grid, Typography, Box, Link, Button, Card } from "@mui/material";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import CourtCard from "./courtCard/CourtCard";
import { useBookingContext } from '../../hooks/bookingContext';

export const ClubInfo = ({ club }) => {
  const { bookingInfo, saveBookingInfo } = useBookingContext();

  const { description, amenities, url, activities, name, neighborhood  } = club
  
  useEffect(() => {
    saveBookingInfo({
      ...bookingInfo,
        clubName: name,
        neighborhoodName: neighborhood.name
      })
  }, [])


  return (
    <>
      <Grid container >
        <Grid item xs={12} md={9}  p={2} sx={{borderBottom: {xs:'2px solid #3FEBBD', md:'none'}, borderRight: {xs:'none', md:'2px solid #3FEBBD'}}}>
          <Typography variant="h6" color="primary.main">
            { description }
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
            <ImageGallery
                showThumbnails={false}
                showBullets={false}
                showFullscreenButton={false}
                showPlayButton={false} 
                items={[{srcSet: url}]}
              />
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  border: "1px solid #434242",
                  borderRadius: "5px",
                  mb: 1,
                  p:1
                }}>
                <Typography variant="body1" color="primary.main">Horarios</Typography>
                <Typography variant="body2" color="secondary.main">Lunes, Martes, Miercoles, Jueves, Viernes: 10:00 a 0:00 am</Typography>
                <Typography variant="body2" color="secondary.main">Sabado: 10:00 a 0:00 am</Typography>
                <Typography variant="body2" color="secondary.main">Feriados: 10:00 a 0:00 am</Typography>
              </Card>
              <Card
                sx={{
                  border: "1px solid #434242",
                  borderRadius: "5px",
                  p:1
                }}>
                <Typography variant="body1" color="primary.main">Servicios del Club</Typography>
                {
                  amenities.map((amenitie, index) => {
                    return <Typography variant="body2" color="secondary.main" key={index} >{amenitie.name}</Typography>
                  })
                }
                </Card>
            </Grid>
            <Typography variant="h5" color="primary.main"p={1} >Canchas y disponibilidad</Typography>
            <Grid container >
              {activities.map((activity) => (
                activity.courts.sort((a, b) => a.id - b.id).map((court) => {
                  return <Grid item xs={12} sm={6} key={court.id} sx={{ p: 1 }}>
                      <CourtCard court={court} activityId={activity.id} activityName={activity.name +" "+ activity.type} />
                  </Grid>
                })
              ))} 
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};