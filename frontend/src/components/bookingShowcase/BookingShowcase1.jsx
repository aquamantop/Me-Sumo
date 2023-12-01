import { Box, Container, Grid, Typography, Paper, Pagination } from "@mui/material";
import { PaperSXX , BoxSX} from "../customMui/CustomMui";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../hooks/api/axiosConfig";
import CustomLoader from "../CustomLoader";
import CourtCard from "../clubShowcase/courtCard/CourtCard";


const itemsPerPage = 2;
const cards = [1,2,3];
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

const BookingShowcase1 = () => {


    //axiosInstance.get(`booking/court_slots?clubId=${clubId}&courtId=${courtId}&activityId=${activityId}`)
    // const [clubs, setClubs] = useState([]);
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [page, setPage] = useState(1);
  
    // useEffect(() => {
    //   // axios({
    //   //   method: "GET",
    //   //   url: "http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/club/",
    //   //   headers: {
    //   //     Accept: "application/json",
    //   //     "Content-Type": "application/json"
    //   //   }
    //   // })
    //   axiosInstance.get('/club/')
    //     .then((response) => {
    //       setClubs(response.data)
    //       setLoading(false)
    //   })
    //   .catch((error) => setError(error))
    // }, [])
  
  
    // const startIndex = (page - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const paginatedBookings = clubs.slice(startIndex, endIndex);
  
    // const numPages = Math.ceil(clubs.length / itemsPerPage);
  
    // const handlePageChange = (event, value) => {
    //   setPage(value);
    // };
  
    // if (loading) {
    //   return <CustomLoader />;
    // }
  
    return (
      <>
      {/* { loading && <p>Loading...</p>}
        {
          !loading && ( */}
            <Container sx={{ mb: 2 }}>
              <Paper sx={PaperSXX}>
                <Box sx={BoxSX}>
                  <Typography variant="h5" color="primary.main">
                    Canchas disponibles
                  </Typography>
                </Box>
                <Grid container>
                  <Typography variant="h6" color="primary.main">
                    {cards.length == 0 ? "No hay clubes disponibles" : ""}
                  </Typography>
                  {cards.map((card, index) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={index}
                        sx={{ p: 2 }}
                      >
                        <CourtCard
                          court={court} 
                          activityId={1}
                        />
                      </Grid>
                    )
                  }
                  )}
                </Grid>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  <Pagination
                  count={1}
                  page={1}
                //   onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{ my: 2 }}
                  />
                </Box>
              </Paper>
            </Container>
          {/* )} */}
    </>
    );

  };
export default BookingShowcase1