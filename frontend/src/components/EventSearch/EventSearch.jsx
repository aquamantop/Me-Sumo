import React, { useState } from "react";
import { Box } from "@mui/system";
import {
    Typography,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Autocomplete
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import {styled } from "@mui/material/styles";
import { DatePicker, DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";

const opciones = ['Futbol 5', 'Futbol 7', 'Futbol 11', 'Tenis', 'Basquet'];
const CssIconButton = styled(IconButton)({
    color: "white",
    // '&.Mui-focused': {
    //   color: '#6F7E8C', // Cambia el color al estar enfocado
    // },
    // '&:hover': {
    //   color: 'blue', // Color al hacer hover
    // },
    // '&.Mui-focused': {
    //   color: 'red', // Color al estar en focus
    // },
});

const CssAutocomplete = styled(Autocomplete)({
  // '& .MuiAutocomplete-option':{
  //   color:'white',
  //   backgroundColor: 'white'
  // },
  "& .MuiAutocomplete-clearIndicator":{
    color:'white',
    '&:hover': {
      backgroundColor: 'rgb(255,255,255,0.1)', // Cambia 'your-hover-color' al color que desees al hacer hover
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgb(255,255,255,0.1)', // Cambia 'your-hover-color' al color que desees al hacer hover
    },
  },
})

const CssDesktopDatePicker = styled (DesktopDatePicker)({
  '& .MuiButtonBase-root':{
    color:'white'
  },
  "& input": {
    color: "white", // Color del texto
},
"& label.Mui-focused": {
    color: "#A0AAB4",
},
"& label": {
    color: "white", // Color del label
},
"& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
},
"& .MuiOutlinedInput-root": {
    "& fieldset": {
        borderColor: "#E0E3E7", // Color del Borde
        backgroundColor: "rgb(255,255,255, 0.1)",
    },
    "&:hover fieldset": {
        borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C",
    },
}
})
const CssTimePicker = styled(TimePicker)({
  '& .MuiButtonBase-root':{
    color:'white'
  },
  "& input": {
    color: "white", // Color del texto
},
"& label.Mui-focused": {
    color: "#A0AAB4",
},
"& label": {
    color: "white", // Color del label
},
"& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
},
"& .MuiOutlinedInput-root": {
    "& fieldset": {
        borderColor: "#E0E3E7", // Color del Borde
        backgroundColor: "rgb(255,255,255, 0.1)",
    },
    "&:hover fieldset": {
        borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C",
    },
}
})
const CssTextField = styled(TextField)({
    "& input": {
        color: "white", // Color del texto
    },
    "& label.Mui-focused": {
        color: "#A0AAB4",
    },
    "& label": {
        color: "white", // Color del label
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#E0E3E7", // Color del Borde
            backgroundColor: "rgb(255,255,255, 0.1)",
        },
        "&:hover fieldset": {
            borderColor: "#B2BAC2",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#6F7E8C",
        },
    },
});
function EventSearch() {
  
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" component="h5" color="primary.main">
                    Buscar Eventos
                </Typography>
                <CssAutocomplete
                id="activity"
                disablePortal
                fullWidth
                sx={{'&button':{color:"white"}}}
                options={opciones}
                renderInput={(params)=>
                   <CssTextField
                   {...params}
                   label="Elegir Actividad"
                    id="custom-css-outlined-input"
                    fullWidth
                    sx={{mt: 2}}
                    
                    InputProps={{
                      ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <CssIconButton>
                                    <AccessibilityNewOutlinedIcon />
                                </CssIconButton>
                            </InputAdornment>
                        ),
                    }}
                   
                   />
                  }
                />
                <CssAutocomplete
                id="category"
                disablePortal
                fullWidth
                sx={{'&button':{color:"white"}}}
                options={opciones}
                renderInput={(params)=>
                   <CssTextField
                   {...params}
                   label="Elejir Categoria"
                    id="custom-css-outlined-input"
                    fullWidth
                    sx={{mt: 2}}
                    
                    InputProps={{
                      ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <CssIconButton>
                                    <CategoryIcon />
                                </CssIconButton>
                            </InputAdornment>
                        ),
                    }}
                   
                   />
                  }
                />
                <CssAutocomplete
                id="nhood"
                disablePortal
                fullWidth
                sx={{'&button':{color:"white"}}}
                options={opciones}
                renderInput={(params)=>
                   <CssTextField
                   {...params}
                   label="Elegir Barrio"
                    id="custom-css-outlined-input"
                    fullWidth
                    sx={{mt: 2}}
                    
                    InputProps={{
                      ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <CssIconButton>
                                    <LocationOnOutlinedIcon />
                                </CssIconButton>
                            </InputAdornment>
                        ),
                    }}
                   
                   />
                  }
                />
                
                <CssDesktopDatePicker
                  label='Elegir Fecha'
                  inputFormat="dd.MM.yyyy"
                  sx={{mt:1.5}}
                  slotProps={{
                  textField: { fullWidth: true },
                  layout: {
                  sx: {
                    '.MuiDateCalendar-root': {
                      color: 'white',
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: '#e91e63',
                      border: '1px solid',
                      backgroundColor: 'rgb(255,255,255,0.1)',
                    }
                  }
                  }
                  }} 
                />
                <CssTimePicker
                  label="Elegir Hora"
                  sx={{mt:2}}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                 />
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ my: 2 }}
                    fullWidth
                >
                    Botón
                </Button>
            </Box>
        </>
    );
}

export default EventSearch;
