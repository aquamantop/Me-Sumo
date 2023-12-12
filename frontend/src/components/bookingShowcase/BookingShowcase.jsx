import React, { useEffect , useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Pagination, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { PaperSXX, BoxSX } from '../customMui/CustomMui';
import CourtCard from '../clubShowcase/courtCard/CourtCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axiosInstance from "../../hooks/api/axiosConfig";
import CustomLoader from "../CustomLoader";
import { useBookingContext } from '../../hooks/bookingContext';

const BookingShowcase = ({ clubId, activityId }) => {

    const { bookingInfo, saveBookingInfo } = useBookingContext();
    const [courts, setCourts] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clubName, setClubName] = useState('');
    const [neighborhoodName, setNeighborhoodName] = useState('');

    useEffect(() => {
      saveBookingInfo({
        ...bookingInfo,
        clubName: clubName,
        neighborhoodName: neighborhoodName
      })
    }, [clubName, neighborhoodName])

    useEffect(() => {

        if (activityId !== null && clubId !== null) {
            axiosInstance.get(`/court/club-activity?clubId=${clubId}&activityId=${activityId}`)
            .then((response) => {
              setClubName(response.data[0].club.name)
              setNeighborhoodName(response.data[0].club.neighborhood.name)
              setCourts(response.data)
              setLoading(false)
            })
        } else {
            setLoading(false);
        }
    }, [activityId, clubId]);
  
    return (
      <>
        <Container sx={{ 
            mb: 2 
        }}>
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
                courts.map((court, index) => (
                <Grid item xs={12} key={index}>
                  <Accordion sx={{background:'none'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" color="secondary.main" sx={{fontSize:'22px'}}>  {court.name} | {court.club.name} | {court.activity.name}-{court.activity.type} </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <CourtCard court={court} activityId={activityId} activityName={court.activity.name} activityType={court.activity.type} clubId={clubId} />
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