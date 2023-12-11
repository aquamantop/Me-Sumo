import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';


const NotFound = () => {
  return (
    <Container>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
    >
   

    <img src="/src/assets/404.png" alt="404" style={{width: '50%', height: '50vh'}}/>    
      <Typography variant="h5" component="div" mt={2} textAlign="center" color="white">
        Ups! Nada por aquí, mejor buscá por {' '}
        <Link to="/" style={{ textDecoration: 'none', color: 'green' }}>
          acá
        </Link>
      </Typography>
    </Box>
    </Container>
  );
};

export default NotFound;
