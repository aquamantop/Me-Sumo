import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Container, Paper, Typography, Box, Button, Link, Grid } from '@mui/material'
import { PaperSXX } from '../components/customMui/CustomMui'
import eventoImagen from "../assets/club-field.png"
import EventCard from '../components/eventShowcase/EventCard'

const Club = () => {
  return (
      <>
          <Header />
          <Container className="content" sx={{my:2}}>
              <Paper sx={PaperSXX}>
                  <Box
                      sx={{
                          border: "2px solid",
                          borderColor: "secondary.main",
                          borderRadius: "10px",
                          margin: "-2px",
                          position: "relative",
                          zIndex: 1,
                          p: 2,
                      }}
                  >
                      <Typography variant="h5" color="primary.main">
                          Deportivo Test FC - Terminal La Noria
                      </Typography>
                  </Box>
                  <>
                      <Grid mt={0} container spacing={2}>
                          {/* Contenedor principal (3/4 de la pantalla) */}
                          <Grid
                              item
                              xs={12}
                              md={9}
                              sx={{
                                  borderRight: "2px solid #62E8FF",
                                  paddingRight: 2,
                              }}
                          >
                              {/* Texto arriba */}
                              <Typography variant="h6" color="primary.main">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nosproident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </Typography>

                              {/* Grilla dividida en partes iguales */}
                              <Grid container spacing={2}>
                                  <Grid item xs={12} md={6}>
                                      {/* Foto */}
                                      <img
                                          src={eventoImagen}
                                          alt="Foto"
                                          style={{ width: "100%" }}
                                      />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                      {/* Caja de horarios */}
                                      <Box>
                                          <Typography
                                              variant="h6"
                                              color="primary.main"
                                          >
                                              Horarios
                                          </Typography>
                                          {/* Contenido de horarios */}
                                      </Box>

                                      {/* Caja de servicios */}
                                      <Box>
                                          <Typography
                                              variant="h6"
                                              color="primary.main"
                                          >
                                              Servicios
                                          </Typography>
                                          {/* Contenido de servicios */}
                                      </Box>
                                  </Grid>
                              </Grid>

                              {/* Botón centrado abajo de todo */}
                              <Box mt={2} textAlign="center">
                              <Link href='/new-event'>
                                <Button
                                variant="contained"
                                color="secondary"
                                sx={{ my:2 }}
                                >
                                Crear evento
                                </Button>
                              </Link>
                              </Box>
                          </Grid>

                          {/* Contenedor de tarjetas (1/4 de la pantalla) */}
                          <Grid item xs={12} md={3}>
                              {/* Renderiza tus tarjetas aquí */}
                              <Box>
                                  <Typography variant="h5" color="primary.main">
                                      Eventos del Club
                                  </Typography>
                              </Box>
                              {Array.from({ length: 3 }).map((_, index) => (
                                  <Grid item  key={index} sx={{ p: 2 }}>
                                      <EventCard/>
                                  </Grid>
                              ))}

                              
                          </Grid>
                      </Grid>
                  </>
              </Paper>
          </Container>
          <Footer />
      </>
  );
}

export default Club

{/* <> 
    <Header/>
    <Container className="content">
      <Paper sx={PaperSXX}>
        <CustomBox>
          <Typography variant="h5" color="primary.main">

          </Typography>
        </CustomBox>
      </Paper>
    </Container>
    <Footer/>
    </> */}