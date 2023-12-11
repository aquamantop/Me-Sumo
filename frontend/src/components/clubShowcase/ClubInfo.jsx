import React, { useEffect } from "react";
import { Grid, Typography, Box, Link, Button, Card, Divider, Container } from "@mui/material";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import CourtCard from "./courtCard/CourtCard";
import { useBookingContext } from '../../hooks/bookingContext';

export const ClubInfo = ({ club }) => {
  const { bookingInfo, saveBookingInfo } = useBookingContext();

  const { description, amenities, url, activities, name, neighborhood } = club

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
                    {/* {
                      amenities.map((amenitie, index) => {
                        return <Typography variant="body2" color="secondary.main" key={index} >{amenitie.name}</Typography>
                      })
                    } */}
                    <Grid container>
                      {amenities.map((amenitie, index) => (
                        <Grid item key={index} xs={6}>
                          <Typography variant="body2" color="z secondary.main">
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
      </Grid>
    </>
  );
};