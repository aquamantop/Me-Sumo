import { Grid, Typography, Box, Link, Button, Card } from "@mui/material";
import EventCard from "../eventShowcase/EventCard";
import { BoxSX } from "../customMui/CustomMui";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export const ClubInfo = ({ club }) => {
  return (
    <>
      <Grid container >
        <Grid item xs={12} md={9}  p={2} sx={{borderBottom: {xs:'2px solid #62E8FF', md:'none'}, borderRight: {xs:'none', md:'2px solid #62E8FF'}}}>
          <Typography variant="h6" color="primary.main">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nosproident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
            <ImageGallery
                items={[{original: "https://me-sumo-img.s3.amazonaws.com/01_futbol-retiro-caba.jpeg",
                thumbnail: "https://me-sumo-img.s3.amazonaws.com/01_futbol-retiro-caba.jpeg"}]}
                showThumbnails={0}
                showBullets={0}
                showFullscreenButton={0}
                showPlayButton={0} 
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
                <Typography></Typography>
              </Card>
              <Card
                sx={{
                  border: "1px solid #434242",
                  borderRadius: "5px",
                  p:1
                }}>
                <Typography variant="body1" color="primary.main">Servicios del Club</Typography>
                {
                  club.amenities.map((amenitie, index) => {
                    return <Typography variant="body2" color="secondary.main" key={index} >{amenitie.name}</Typography>
                  })
                }
                </Card>
            </Grid>
          </Grid>
          <Box mt={2} textAlign="center">
            <Link href="/new-event">
              <Button
                variant="contained"
                color="secondary"
                sx={{ my: 2 }}
              >
                Crear evento
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}  p={2}>
          <Typography variant="h5" color="primary.main">
            Eventos del Club
          </Typography>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid item key={index} sx={{ my: 1 }}>
              <EventCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
