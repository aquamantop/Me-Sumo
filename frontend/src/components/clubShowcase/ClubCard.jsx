import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button, Link } from "@mui/material";
import eventoImagen from "../../assets/club-field.png"

const ClubCard = ({ club }) => {
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          border: "1px solid #434242",
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
          <Typography variant="h6" color="primary.main">
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
          height="200"
          image={ club.url ? club.url : eventoImagen }
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <Link href={`/club/${club.id}`} >
            <Button variant="contained" color="secondary">
              Ver Más
            </Button>
          </Link>
        </Box>
      </Card>
    </>
  );
};

export default ClubCard;
