import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
    Typography,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Autocomplete,
    Paper,
    createTheme,
    ThemeProvider
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import { styled } from "@mui/material/styles";
import { DesktopDatePicker, StaticDatePicker, TimePicker } from "@mui/x-date-pickers";
import { ButtonSX } from "../customMui/CustomMui";
import  axiosInstance  from "../../hooks/api/axiosConfig";


  const theme = createTheme({
    palette: {
        background: {
            paper: '#1d2132',
          },
          text: {
            primary: '#FFFFFF'
          },
    },
  });

  
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
  '& .MuiPaper-root':{
      '& .MuiAutocomplete-listbox': {
        '& .MuiAutocomplete-option': {
          backgroundColor: 'red !important',
          color: 'white !important'
        }
      }
  }
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
    '& .MuiTimePickerToolbar-container': {
        backgroundColor: 'white', // Reemplaza 'tu-color-aqui' con el color deseado
      },
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
},
'& .css-exqui8-MuiPaper-root-MuiDialog-paper' : {
    backgroundColor:'white'
},
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

const CustomPaper = styled(Paper)({
    '& .MuiAutocomplete-option': {
        color: 'white',//Color de la fuente
        '&:hover': {
            backgroundColor: "rgb(255,255,255, 0.1)",
        },
        '&&[aria-selected="true"].Mui-focused':{
            backgroundColor: "green"
        }
      },
    '& .MuiAutocomplete-listbox':{
        backgroundColor: 'rgb(255,255,255, 0.1)',//Color del fondo 
    }
})
function EventSearch() {
    
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 


    useEffect(() => {
        axiosInstance.get('/neighborhood/')
        .then((response) => {
          setNeighborhoods(response.data.map(item => item.name))
          setLoading(false)
      })
      .catch((error) => setError(error))

        axiosInstance.get('/activity/')
        .then((response) => {
           const uniqueNamesSet = new Set(response.data.map(item => item.name));
           const uniqueNamesList = [...uniqueNamesSet];
           setActivities(uniqueNamesList)
           setLoading(false)
      })
      .catch((error) => setError(error))

        axiosInstance.get('/activity/')
        .then((response) => {
          setCategories(response.data.map(item => item.name + " " + item.type))
          setLoading(false)
      })
      .catch((error) => setError(error))
    }, [])


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mx:2,
                    position: "sticky",
                    top: "140px"

                }}
            >
                <Typography variant="h5" component="h5" color="primary.main">
                    Buscar Eventos
                </Typography>
                
                <CssAutocomplete
                id="activity"
                disablePortal
                fullWidth
                PaperComponent={CustomPaper}
                sx={{'&button':{color:"white"}}}
                options={activities}
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
                PaperComponent={CustomPaper}
                sx={{'&button':{color:"white"}}}
                options={categories}
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
                PaperComponent={CustomPaper}
                sx={{'&button':{color:"white"}}}
                options={neighborhoods}
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
                      color: 'black',
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: '#e91e63',
                      border: '1px solid',
                    //   backgroundColor: 'rgb(255,255,255,0.1)',
                      backgroundColor: 'white',
                      '& .MuiTypography-root': {
                        color: 'black', // Color del texto en el calendario
                      },
                    }
                  }
                  }
                  }} 
                />
                <ThemeProvider theme={theme}>
                    <CssTimePicker
                    label="Elegir Hora"
                    sx={{mt:2,}}
                    slotProps={{
                        textField: { fullWidth: true },
                        
                    }}
                    />
                </ThemeProvider>
                <Button 
                variant="contained" 
                fullWidth 
                sx={{
                    ...ButtonSX,
                    m:2
                    }} >
                    Buscar
                </Button>
            </Box>
        </>
    );
}

export default EventSearch;
