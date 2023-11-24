import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Container, Paper, Typography, Box, Button, Link, Grid } from '@mui/material'
import { PaperSXX } from '../components/customMui/CustomMui'
import { ClubInfo } from '../components/clubShowcase/ClubInfo'
import axiosInstance from "../hooks/api/axiosConfig";

const Club = () => {
    const { id } = useParams();

    const [club, setClub] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            axiosInstance.get(`/club/${id}`)
            .then((response) => {
                setClub(response.data)
                setLoading(false)
            })
            .catch((error) => setError(error))
    }, [])

    return (
        <>
        {loading && <p>Loading...</p>}
        {
            !loading && (
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
                          { club.name } | { club.address }
                      </Typography>
                  </Box>
                  <ClubInfo club={ club }/>
              </Paper>
          </Container>
          <Footer />
            </>
            )}
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