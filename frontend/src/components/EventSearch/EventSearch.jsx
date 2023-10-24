import React from 'react';
import { Box } from '@mui/system';
import { Grid, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';

function EventSearch() {
  return (
    <>
  
      <Box
      sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      }}>
          <Typography variant='h5' component='h5' color='primary.main'>
              Buscar Eventos
          </Typography>
          <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ mt: 2 }}
              label="Elegir Actividad"
              fullWidth 
              InputProps={{
                  startAdornment: (
                      <InputAdornment position='start'>
                          <IconButton>
                              <AccessibilityNewOutlinedIcon />
                          </IconButton>
                      </InputAdornment>
                  )
              }}
          />
          <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ 
                mt: 2,
              }}
              
              label="Elegir Club"
              fullWidth 
              InputProps={{
                  startAdornment: (
                      <InputAdornment position='start'>
                          <IconButton>
                              <LocationOnOutlinedIcon />
                          </IconButton>
                      </InputAdornment>
                  )
              }}
          />
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        fullWidth
      >
        Botón
      </Button>
      </Box>

    </>
  )
}

export default EventSearch