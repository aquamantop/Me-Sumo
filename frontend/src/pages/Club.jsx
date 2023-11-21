import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Container, Paper, Typography, Box, Button, Link, Grid } from '@mui/material'
import { PaperSXX } from '../components/customMui/CustomMui'
import eventoImagen from "../assets/club-field.png"
import EventCard from '../components/eventShowcase/EventCard'
import { ClubInfo } from '../components/clubShowcase/ClubInfo'

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
                  <ClubInfo/>
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