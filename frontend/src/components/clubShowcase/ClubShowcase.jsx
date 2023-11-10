import { Container, Paper, Box, Typography, Grid } from '@mui/material'
import React from 'react'
import { PaperSXX } from '../customMui/CustomMui'
import EventCard from "../eventCard/EventCard";

const ClubShowcase = () => {
  return (
    <Container sx={{mb:2}}>
        <Paper sx={PaperSXX}>
            <Box
            sx={{
                border: "2px solid",
                borderColor: "secondary.main",
                borderRadius: "10px",
                margin: '-2px',
                position: 'relative',
                zIndex: 1,
                p: 2,
            }}
            >
            <Typography variant="h5" color="primary.main" >Clubes</Typography>

            </Box>
            <Grid container >
                {Array.from({ length: 3 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ p: 2 }}>
                        <EventCard/>
                    </Grid>
                ))} 
            </Grid>
        </Paper>
    </Container>
  )
}

export default ClubShowcase