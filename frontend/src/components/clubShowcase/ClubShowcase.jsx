import { Container, Paper, Box, Typography, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PaperSXX } from "../customMui/CustomMui";
import ClubCard from "./ClubCard";
import { BoxSX } from "../customMui/CustomMui";
//import axios from "axios"
import axiosInstance from "../../hooks/api/axiosConfig";
import CustomLoader from "../CustomLoader";

const itemsPerPage = 3;

const ClubShowcase = () => {

  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axiosInstance.get('/club/')
      .then((response) => {
        setClubs(response.data)
        setLoading(false)
    })
    .catch((error) => setError(error))
  }, [])


  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = clubs.slice(startIndex, endIndex);

  const numPages = Math.ceil(clubs.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <>
    { loading && <p>Loading...</p>}
      {
        !loading && (
          <Container sx={{ mb: 2 }}>
            <Paper sx={PaperSXX}>
              <Box sx={BoxSX}>
                <Typography variant="h5" color="primary.main">
                  Clubes
                </Typography>
              </Box>
              <Grid container>
                <Typography variant="h6" color="primary.main">
                  {clubs.length == 0 || error ? "No hay clubes disponibles" : ""}
                </Typography>
                {paginatedBookings.map((club, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      sx={{ p: 2 }}
                    >
                      <ClubCard
                        club={club}
                      />
                    </Grid>
                  )
                }
                )}
              </Grid>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
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
        )}
  </>
  );
};

export default ClubShowcase;