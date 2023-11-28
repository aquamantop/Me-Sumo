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
import { ButtonSX, TextFieldSX, CustomTextField  } from "../customMui/CustomMui";
import  axiosInstance  from "../../hooks/api/axiosConfig";
import Loader from "../loader";
import dayjs from 'dayjs';


function EventSearch() {

    const today = new Date();
    const [bookings, setBookings] = useState([]);
    const [activities, setActivities] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);

    const shouldDisableDate = (date) => {
        if (!date || !dayjs(date).isValid()) {
            // Manejar el caso en el que date no sea una instancia válida de dayjs
            return true;
        }
    
        const formattedDate = dayjs(date).format('YYYY-MM-DD'); // Convertir date a formato "yyyy-mm-dd"
        
        return !dates.includes(formattedDate);
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axiosInstance.get('/booking/filter_endpoint');
                setNeighborhoods(response.data.neighborhood);
                setActivities(response.data.uniqueActivities);
                setDates(response.data.bookingDates);
                setLoading(false);
                console.log(response.data.bookingDates);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchBookings();
    }, []);
  

    if (loading) {
        return <Loader />;
    }

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
                    
                <Autocomplete
                    id="activity"
                    disablePortal
                    fullWidth
                    options={activities}
                    renderInput={(params)=>
                    <TextField
                    {...params}
                        label="Elegir Actividad"
                        id="custom-css-outlined-input"
                        sx={{ mt: 2}}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <AccessibilityNewOutlinedIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    }
                />

                <Autocomplete
                id="nhood"
                disablePortal
                fullWidth
                options={neighborhoods}
                renderInput={(params)=>
                   <TextField
                   {...params}
                   label="Elegir Barrio"
                    id="custom-css-outlined-input"
                    sx={{ mt: 2}}
                    InputProps={{
                      ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <LocationOnOutlinedIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                   
                   />
                  }
                />
                
                <DesktopDatePicker
                    label='Elegir Fecha'
                    inputFormat="dd.MM.yyyy"
                    sx={{ mt: 1.5 }}
                    shouldDisableDate={shouldDisableDate}
                    slotProps={{
                        textField: { 
                            fullWidth: true,
                            
                        },
                        layout: {
                            sx: {
                                '.MuiDateCalendar-root': {
                                    borderRadius: 2,
                                    borderWidth: 1,
                                    border: '1px solid',
                                },
                            }
                        }
                    }}
                />

                <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{...ButtonSX,m:2}}
                >
                    Buscar
                </Button>
            </Box>
        </>
    );
}

export default EventSearch;
