import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button, Link } from "@mui/material";
import eventoImagen from "../../assets/club-field.png"

const ClubCard = ({name, address, neighborhood, activities}) => {
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
            Club: {name}
          </Typography>
          <Typography variant="h6" color="primary.main">
            Dirección: {address}
          </Typography>
          <Typography variant="body2" color="secondary.main">
            Barrio: {neighborhood.name}
          </Typography>
          <Typography variant="body2" color="secondary.main">
            Actvividades: {
              activities.map((activity) => {
                return activity.name+" "+activity.type+", "
              })
            }
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="Imagen del Evento"
          height="200"
          image={eventoImagen}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <Link href='/club' >
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
