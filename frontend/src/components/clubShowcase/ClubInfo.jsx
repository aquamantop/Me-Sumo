import { Grid, Typography, Box, Link, Button, Card } from "@mui/material";
import EventCard from "../eventShowcase/EventCard";
import { BoxSX } from "../customMui/CustomMui";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export const ClubInfo = () => {
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
                items={images}
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
