import { Container, Paper, Box, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PaperSXX } from "../customMui/CustomMui";
import ClubCard from "./ClubCard";
import { BoxSX } from "../customMui/CustomMui";
import axios from "axios"

const ClubShowcase = () => {

  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://ec2-50-17-115-59.compute-1.amazonaws.com:8090/club/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        setClubs(response.data)
        setLoading(false)
    })
    .catch((error) => setError(error))
  }, [])

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
                {clubs.map((club, index) => {
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
            </Paper>
          </Container>
        )}
  </>
  );
};

export default ClubShowcase;
