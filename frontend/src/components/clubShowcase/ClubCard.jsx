import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button, Link } from "@mui/material";
import eventoImagen from "../../assets/club-field.png";
import { ButtonSX } from "../customMui/CustomMui";

const ClubCard = ({ club }) => {
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          border: "1px solid #434242",
          height: "400px",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 0 5px 5px rgb(195, 253, 116, 0.2)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" color="primary.main">
            Club: {club.name}
          </Typography>
          <Typography variant="h6" color="primary.main" sx={{ fontSize: '14px' }}>
            Dirección: {club.address}
          </Typography>
          <Typography variant="body2" color="secondary.main">
            Barrio: {club.neighborhood.name}
          </Typography>
          <Typography variant="body2" color="secondary.main">
            Actvividades: {
              club.activities.map((activity) => {
                return activity.name+" "+activity.type+", "
              })
            }
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="Imagen del Evento"
          maxHeight="200"
          image={club.url ? club.url : eventoImagen}
          /* sx={{
            objectFit: "cover"
          }} */
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 0,
            mb: 0,
          }}
        >
          <Link href={`/club/${club.id}`} >
          <Button variant="contained" fullWidth sx={{...ButtonSX}}>
              Ver Más
            </Button> 
          </Link>
        </Box>
      </Card>
    </>
  );
};

export default ClubCard;