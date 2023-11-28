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
    const [activitiesMap, setActivitiesMap] = useState({});
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const shouldDisableDate = (date) => {
        if (!date || !dayjs(date).isValid()) {
            return true;
        }
        const formattedDate = dayjs(date).format('YYYY-MM-DD');        
        return !dates.includes(formattedDate);
    };


    useEffect(() => {
        const fetchBookings = async () => {
            try {

                let selectedActivityID = null;
                if (selectedActivity!=null) selectedActivityID = activitiesMap[selectedActivity];

                const response = await axiosInstance.get(`/booking/filter_endpoint?neighborhood=${selectedNeighborhood}&${selectedActivityID ? `activityId=${selectedActivityID}` : ''}&date=${selectedDate}`);

                setNeighborhoods(response.data.neighborhood);
                setActivities(response.data.activities.map(activity => activity.name));
                setActivitiesMap(
                    response.data.activities.reduce((acc, activity) => {
                        acc[activity.name] = activity.id;
                        return acc;
                    }, {})
                );
                setDates(response.data.bookingDates);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchBookings();
    }, [selectedActivity, selectedNeighborhood, selectedDate]);


    const handleActivityChange = (selectedValue) => {
        console.log("Hola")
        console.log(selectedValue)
        setSelectedActivity(selectedValue);
    };
    
    const handleNeighborhoodChange = (event) => {
        setSelectedNeighborhood(event.target.value);
    };


    // useEffect(() => {
    //     // Filtrar las actividades únicas
    //     const uniqueActivities = Array.from(new Set(allBookings.map(booking => booking.activity)));
    //     setActivities(uniqueActivities);
    //   }, [allBookings]);
    
    //   useEffect(() => {
    //     // Filtrar los barrios únicos
    //     const uniqueNeighborhoods = Array.from(new Set(allBookings.map(booking => booking.neighborhood)));
    //     setNeighborhoods(uniqueNeighborhoods);
    //   }, [allBookings]);
    


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
                    value={selectedActivity} // Asigna el valor seleccionado
                    onChange={(event, value) => handleActivityChange(value)} // Maneja el cambio
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
