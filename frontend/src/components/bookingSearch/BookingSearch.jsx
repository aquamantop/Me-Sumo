import React, { useState, useEffect } from 'react';
import {
  Button,
  Autocomplete,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import axiosInstance from '../../hooks/api/axiosConfig';
import { ButtonSX, TextFieldSX, CustomTextField  } from "../customMui/CustomMui";

function BookingSearch( {onUpdateFilters} ) {
    const [activities, setActivities] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedClub, setSelectedClub] = useState(null);
    const [filteredClubs, setFilteredClubs] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [mappedActivities, setMappedActivities] = useState({})
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const fetchClubs = async () => {
        try {
            const response = await axiosInstance.get('/club/');
            setClubs(response.data);
            setFilteredClubs(response.data.map((club) => club.name));
        } catch (error) {
            console.error('Error fetching clubs:', error);
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await axiosInstance.get('/activity/');
            const mapping = response.data.reduce((acc, activity) => {
                const key = `${activity.type} ${activity.name}`;
                acc[key] = activity.id;
                return acc;
            }, {});
            setMappedActivities(mapping);
            setActivities(mapping);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const handleActivityChange = (event, value) => {
        setSelectedActivity(value);
    };

    const handleClubChange = (event, value) => {
        setSelectedClub(value);
        console.log('Clubesssssss')
        console.log(value)
        console.log(value.id)
    };

    const handleButtonClick = () => {
        onUpdateFilters({
            activityId: selectedActivity.value,
            clubId: selectedClub.id,
        });
        console.log(selectedActivity.value, selectedClub.id)
    };


    useEffect(() => {
        fetchClubs();
        fetchActivities();
    }, []);


    useEffect(() => {
        const allClubActivities = clubs.flatMap((club) =>
            club.activities.map((activity) => ({
                label: `${activity.type} ${activity.name}`,
                value: activity.id,
            }))
        );
        const uniqueActivities = Array.from(new Set(allClubActivities.map(activity => activity.label)))
            .map(label => allClubActivities.find(activity => activity.label === label));
        setFilteredActivities(uniqueActivities);
    }, [clubs, selectedClub]);


    useEffect(() => {
        console.log(filteredClubs);
        if (selectedActivity) {
            console.log(selectedActivity.value)
            const selectedActivityId = selectedActivity.value
  
            console.log(selectedActivityId);
            setFilteredClubs(
                clubs.filter((club) =>
                club.activities.some((activity) => activity.id === selectedActivityId)
                )
            );
        }
    }, [selectedActivity, clubs, activities]);


    useEffect(() => {
        if (selectedActivity && selectedClub) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [selectedActivity, selectedClub]);
    

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mx: 2,
                    position: 'sticky',
                    top: '140px',
                }}
            >
                <Typography variant="h5" component="h5" color="primary.main">
                    Buscar disponibilidad
                </Typography>

                <Autocomplete
                    id="activity"
                    disablePortal
                    fullWidth
                    options={filteredActivities}
                    getOptionLabel={(option) => option.label || ''}
                    value={selectedActivity}
                    onChange={handleActivityChange}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Elegir Actividad"
                        id="custom-css-outlined-input"
                        sx={{ mt: 2 }}
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
                    )}
                />

                <Autocomplete
                    id="club"
                    disablePortal
                    fullWidth
                    options={filteredClubs}
                    getOptionLabel={(option) => option.name || ''}
                    value={selectedClub}
                    onChange={handleClubChange}
                    disabled={!selectedActivity}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Elegir Club"
                        id="custom-css-outlined-input"
                        sx={{ mt: 2 }}
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
                    )}
                />

                <Button 
                    //onClick={() => onUpdateFilters({ activityId: selectedActivityId, neighborhood: selectedNeighborhood, date: selectedDate })}
                    variant="contained" 
                    fullWidth 
                    sx={{...ButtonSX,m:2}}
                    disabled={isButtonDisabled}
                    onClick={handleButtonClick}
                    
                >
                    Buscar
                </Button>

            </Box>
        </>
  );
}

export default BookingSearch;