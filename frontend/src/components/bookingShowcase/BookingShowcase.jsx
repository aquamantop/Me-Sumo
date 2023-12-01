import React, { useEffect , useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Pagination, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { PaperSXX, BoxSX } from '../customMui/CustomMui';
import CourtCard from '../clubShowcase/courtCard/CourtCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axiosInstance from "../../hooks/api/axiosConfig";
import CustomLoader from "../CustomLoader";

//const itemsPerPage = 5;
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

const BookingShowcase = ({activityId, clubId}) => {

    const [courts, setCourts] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // const [page, setPage] = useState(1);
    // const startIndex = (page - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const paginatedCourts = cards.slice(startIndex, endIndex);
    // const numPages = Math.ceil(cards.length / itemsPerPage);

    // const handlePageChange = (event, value) => {
    //   setPage(value);
    // };

    // if (loading) {
    //     return <CustomLoader />;
    // }

    useEffect(() => {

        // console.log(filters.activityId, filters.neighborhood, filters.date)
        //let endpoint = ""
  
        //filters.activityId==null & filters.neighborhood==null & filters.date ==null ?
        //endpoint =  '/booking/approved?approved=false' :
        //endpoint =  `/booking/filter_endpoint?full=true&${filters.neighborhood ? `neighborhood=${filters.neighborhood}` : ''}&${filters.activityId ? `activityId=${filters.activityId}` : ''}&${filters.date ? `date=${filters.date}` : ''}`
        if (activityId !== null && clubId !== null) {
            axiosInstance.get('/court/')
            .then((response) => {
                setCourts(response.data)
                setLoading(false)
                console.log(response.data)
            })
        } else {
            setLoading(false);
        }
    }, [activityId, clubId]);
  


  
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
                {courts.length === 0 ?
                <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>  
                <Typography variant="h6" color="secondary.main" sx={{paddingTop:'100px', paddingBottom:'100px'}}>
                    Aplique los filtros para encontrar las canchas disponibles
                </Typography>
                </Box> :
              courts.map((slot, index) => (
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
            </Box>
          </Paper>
        </Container>
      </>
    );
  };
  
  export default BookingShowcase;