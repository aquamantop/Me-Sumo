import { Container, Paper, Box, Typography, Grid } from "@mui/material";
import React from "react";
import { PaperSXX } from "../customMui/CustomMui";
import ClubCard from "./ClubCard";
import { BoxSX } from "../customMui/CustomMui";

const ClubShowcase = () => {
  return (
    <Container sx={{ mb: 2}}>
      <Paper sx={PaperSXX}>
        <Box sx={BoxSX}>
          <Typography variant="h5" color="primary.main">
            Clubes
          </Typography>
        </Box>
        <Grid container>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ p: 2 }}
            >
              <ClubCard />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ClubShowcase;
