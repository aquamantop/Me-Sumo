import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Pagination, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { PaperSXX, BoxSX } from '../customMui/CustomMui';
import CustomLoader from '../CustomLoader';
import CourtCard from '../clubShowcase/courtCard/CourtCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const itemsPerPage = 5;
const cards = [1,2,3,4,5,6,7,8,9,10];
const court = {
    "id": 1,
    "name": "Cancha 1 F5",
    "court_type": "CESPED_SINTETICO",
    "inside": false,
    "slots": [
        {
            "id": 13,
            "capacity": 10,
            "days": [
                {
                    "id": 7,
                    "name": "Domingo"
                },
                {
                    "id": 2,
                    "name": "Martes"
                },
                {
                    "id": 4,
                    "name": "Jueves"
                },
                {
                    "id": 5,
                    "name": "Viernes"
                },
                {
                    "id": 6,
                    "name": "Sabado"
                },
                {
                    "id": 3,
                    "name": "Miercoles"
                },
                {
                    "id": 1,
                    "name": "Lunes"
                }
            ],
            "startTime": "16:00:00",
            "endTime": "17:00:00"
        },
        {
            "id": 47,
            "capacity": 10,
            "days": [
                {
                    "id": 5,
                    "name": "Viernes"
                },
                {
                    "id": 3,
                    "name": "Miercoles"
                },
                {
                    "id": 1,
                    "name": "Lunes"
                }
            ],
            "startTime": "19:00:00",
            "endTime": "20:00:00"
        },
        {
            "id": 46,
            "capacity": 10,
            "days": [
                {
                    "id": 4,
                    "name": "Jueves"
                }
            ],
            "startTime": "17:00:00",
            "endTime": "18:00:00"
        },
        {
            "id": 50,
            "capacity": 10,
            "days": [
                {
                    "id": 5,
                    "name": "Viernes"
                },
                {
                    "id": 3,
                    "name": "Miercoles"
                },
                {
                    "id": 1,
                    "name": "Lunes"
                }
            ],
            "startTime": "19:00:00",
            "endTime": "20:00:00"
        },
        {
            "id": 51,
            "capacity": 10,
            "days": [
                {
                    "id": 5,
                    "name": "Viernes"
                },
                {
                    "id": 3,
                    "name": "Miercoles"
                },
                {
                    "id": 1,
                    "name": "Lunes"
                }
            ],
            "startTime": "19:00:00",
            "endTime": "20:00:00"
        }
    ]
}

const BookingShowcase = () => {
    const [page, setPage] = useState(1);
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCourts = cards.slice(startIndex, endIndex);
  
    const numPages = Math.ceil(cards.length / itemsPerPage);
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    return (
      <>
        <Container sx={{ mb: 2 }}>
          <Paper sx={PaperSXX}>
            <Box sx={BoxSX}>
              <Typography variant="h5" color="primary.main">
                Canchas disponibles
              </Typography>
            </Box>
            <Grid container>
              <Typography variant="h6" color="primary.main">
                {paginatedCourts.length === 0 ? 'No hay canchas disponibles' : ''}
              </Typography>
              {paginatedCourts.map((slot, index) => (
                <Grid item xs={12} key={index}>
                  <Accordion sx={{background:'none'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" sx={{fontSize:'14px'}}>{` Club${index + 1} | Cancha - ${index + 1}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CourtCard court={court} activityId={1} />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={numPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{ my: 2 }}
              />
            </Box>
          </Paper>
        </Container>
      </>
    );
  };
  
  export default BookingShowcase;