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





function EventSearch() {
    
    // const [neighborhoods, setNeighborhoods] = useState([]);
    // const [activities, setActivities] = useState([]);
    // const [categories, setCategories] = useState([]);

    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true); 


    // useEffect(() => {
    //     axiosInstance.get('/neighborhood/')
    //     .then((response) => {
    //       setNeighborhoods(response.data.map(item => item.name))
    //       setLoading(false)
    //   })
    //   .catch((error) => setError(error))

    //     axiosInstance.get('/activity/')
    //     .then((response) => {
    //        const uniqueNamesSet = new Set(response.data.map(item => item.name));
    //        const uniqueNamesList = [...uniqueNamesSet];
    //        setActivities(uniqueNamesList)
    //        setLoading(false)
    //   })
    //   .catch((error) => setError(error))

    //     axiosInstance.get('/activity/')
    //     .then((response) => {
    //       setCategories(response.data.map(item => item.name + " " + item.type))
    //       setLoading(false)
    //   })
    //   .catch((error) => setError(error))
    // }, [])


    const today = new Date();
    const [bookings, setBookings] = useState([]);

    const [activities, setActivities] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);


    // const isDateDisabled = (date) => {
    //   return isBefore(date, today);
    // };

    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await axiosInstance.get('/booking/');
          setBookings(response.data);
        //   console.log(response.data)
        } catch (error) {
          console.error('Error fetching bookings:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBookings();
    }, []);
  

    useEffect(() => {
      const fetchOptions = async () => {
        setLoading(true);
        try {
          const uniqueActivities = new Set();
          const uniqueNeighborhoods = new Set();
          const uniqueDates = new Set();
          const uniqueTimes = new Set();
  
          await Promise.all(
            bookings.map(async (booking) => {
              const slotResponse = await axiosInstance.get(`/slot/getWithCourt/${booking.slotId}`);

            //   console.log(slotResponse.data)
              const slotData = slotResponse.data;

              uniqueActivities.add(slotData.court.activity.name + " " + slotData.court.activity.type);
              uniqueNeighborhoods.add(slotData.court.club.neighborhood.name);
              uniqueDates.add(booking.date);
              uniqueTimes.add(booking.startTime);
            })
          );
  
          setActivities(Array.from(uniqueActivities));
          setNeighborhoods(Array.from(uniqueNeighborhoods));
          setDates(Array.from(uniqueDates));
          setTimes(Array.from(uniqueTimes));
        } catch (error) {
          console.error('Error fetching options:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOptions();
    }, [bookings]);
  

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

                {/* <Autocomplete
                id="activity"
                disablePortal
                fullWidth
                options={activities}
                renderInput={(params)=>
                   <TextField
                   {...params}
                    label="TEST"
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
                /> */}

                {/* <Autocomplete
                id="category"
                disablePortal
                fullWidth
                options={categories}
                renderInput={(params)=>
                   <TextField
                   {...params}
                   label="Elegir Categoria"
                    id="custom-css-outlined-input"
                    sx={{ mt: 2}}
                    InputProps={{
                      ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <CategoryIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                   
                   />
                  }
                /> */}

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
                    {/* <TimePicker
                    label="Elegir Hora"
                    sx={{mt:2,}}
                    slotProps={{
                        textField: { fullWidth: true },
                        
                    }}
                    /> */}
                <Button 
                variant="contained" 
                fullWidth 
                sx={{...ButtonSX,m:2}}>
                    Buscar
                </Button>
            </Box>
        </>
    );
}

export default EventSearch;
