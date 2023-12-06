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
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 0 5px 5px rgb(195, 253, 116, 0.2)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" color="primary.main" noWrap>
            Club: {club.name}
          </Typography>
          <Typography variant="body2" color="primary.main" noWrap>
            Dirección: {club.address}
          </Typography>
          <Typography variant="body2" color="secondary.main" noWrap>
            Barrio: {club.neighborhood.name}
          </Typography>
          <Typography variant="body2" color="secondary.main" noWrap>
            Actvividades: {
              club.activities.map((activity, index, array) => {
                return activity.name + " " + activity.type + (index === array.length - 1 ? '' : ', ');              })
            }
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="Imagen del Evento"
          height="200"
          image={club.url ? club.url : eventoImagen}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 0,
            mb: 0,
          }}
        >
          <Link href={`/club/${club.id}`} sx={{width:"100%"}} >
          <Button 
          variant="contained" 
          fullWidth sx={{...ButtonSX}}>
              Ver Más
            </Button> 
          </Link>
        </Box>
      </Card>
    </>
  );
};

export default ClubCard;