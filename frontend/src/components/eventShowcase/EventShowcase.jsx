import { Box, Container, Grid, Typography, Paper, Pagination } from "@mui/material";
import EventCard from "./EventCard";
import { PaperSXX } from "../customMui/CustomMui";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../hooks/api/axiosConfig";
import Loader from "../loader";

const itemsPerPage = 3;

function EventShowcase({keyword, filters}) {

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); 

       
  useEffect(() => {

    console.log(filters.activityId, filters.neighborhood, filters.date)
    let endpoint = ""

    filters.activityId==null & filters.neighborhood==null & filters.date ==null ?
    endpoint =  '/booking/approved?approved=false' :
    endpoint =  `/booking/filter_endpoint?full=true&${filters.neighborhood ? `neighborhood=${filters.neighborhood}` : ''}&${filters.activityId ? `activityId=${filters.activityId}` : ''}&${filters.date ? `date=${filters.date}` : ''}`


    axiosInstance.get(endpoint)
    //axiosInstance.get('/booking/approved?approved=false')
    //axiosInstance.get(`/booking/filter_endpoint?full=true&${filters.selectedNeighborhood ? `neighborhood=${filters.selectedNeighborhood}` : ''}&${filters.selectedActivityId ? `activityId=${filters.selectedActivityId}` : ''}&${filters.selectedDate ? `date=${filters.selectedDate}` : ''}`)
    .then((response) => {
      setBookings(response.data)
      setLoading(false)
    //   console.log(response.data)
    })
    .catch((error) => setError(error))
  }, [filters])


  const sortedBookings = bookings.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.startTime}`);
    const dateB = new Date(`${b.date} ${b.startTime}`);
    return dateA - dateB;
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = sortedBookings.slice(startIndex, endIndex);
  console.log(paginatedBookings)
  console.log(startIndex,endIndex)

  const numPages = Math.ceil(sortedBookings.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
  <>
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
          <Typography variant="h5" color="primary.main">
            <span style={{ color: 'orange', marginLeft:'10px'}}>{keyword}</span> {keyword=='Todos' ? 'los eventos' : 'eventos'}
          </Typography>
        </Box>
        <Grid container > 
          {paginatedBookings.map((booking, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ p: 2 }}
              >
                <EventCard booking={booking}/>
              </Grid>        
            )}
          )}
        </Grid>
        {keyword === 'Todos' && (
          <Pagination
            count={numPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{ mt: 2, justifyContent: 'center' }}
          /> 
        )}
      </Paper>
    </Container>
  </>
  );
}

export default EventShowcase;
