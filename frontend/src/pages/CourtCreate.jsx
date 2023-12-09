import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Divider,
    TextField,
    Grid,
    Autocomplete,
    Button,
    InputAdornment,
    IconButton,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    List,
    ListItem,
  } from "@mui/material";
import { PaperSXX, BoxSX, ButtonSX } from "../components/customMui/CustomMui";
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import StadiumOutlinedIcon from '@mui/icons-material/StadiumOutlined';
import CustomLoader from "../components/CustomLoader";
import axiosInstance from "../hooks/api/axiosConfig";
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import { useUserContext } from "../hooks/userContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const options = [];
const courtType = ["CESPED_SINTETICO", "CESPED_NATURAL", "CEMENTO", "PARQUET_MADERA", "RESINA", "TIERRA"]
const inside  = {0:"NO", 1:"SÍ"}
const activities  = {1:"Fútbol 5",
                    2:"Fútbol 6",
                    3:"Fútbol 7",
                    4:"Fútbol 8",
                    5:"Fútbol 9",
                    6:"Fútbol 11"
                }


const CreateCourt = () => {
  
    const { user } = useUserContext();
    const [isButtonEnabled, setButtonEnabled] = useState(false);
    const [clubData, setClubData] = useState(null);



    const [courtInfo, setCourtInfo] = useState({
        name: null,
        activity:null,
        court: null,
        inside: null,
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(`/court/club/${user.clubId}`);
            setClubData(response.data);
          } catch (error) {
            console.error('Error fetching club data:', error);
          }
        };
    
        fetchData();
      }, []);
    
    const groupCourtsByActivity = () => {
        if (!clubData) return {};
    
        return clubData.reduce((groupedCourts, court) => {
          const key = `${court.activity.name} ${court.activity.type}`;
    
          if (!groupedCourts[key]) {
            groupedCourts[key] = [];
          }
    
          groupedCourts[key].push(court);
    
          return groupedCourts;
        }, {});
    };
    
    const groupedCourts = groupCourtsByActivity();



    const handleCreateCourt = async () => {
        try {
            console.log(courtInfo)
            const body = {
                name: courtInfo.name,
                club: {id: user.clubId},
                activity: {id: courtInfo.activity},
                court_type : courtInfo.court,
                inside: courtInfo.inside,
                slots: [{}]
            }
            console.log(body)
            const response = await axiosInstance.post('/court/add', body,
             {headers: {
                 "Authorization": `Bearer ${user.token}`
              }}
            
            
            );        
            console.log(response.data);
        } catch (error) {
            console.error('Error al crear la cancha:', error);
        }
    };

    const handleInputChange = (fieldName) => (event, value) => {
        let fieldValue = value || event.target.value;
    
        if (fieldName === 'activity') {
          const selectedActivityKey = Object.keys(activities).find(
            (key) => activities[key] === fieldValue
          );
          fieldValue = selectedActivityKey ? Number(selectedActivityKey) : null;
        }
    
        if (fieldName === 'inside') {
            fieldValue = fieldValue === 'SÍ' ? 1 : fieldValue === 'NO' ? 0 : null;
        }
        


    
        setCourtInfo((prevCourtInfo) => {
          const updatedCourtInfo = {
            ...prevCourtInfo,
            [fieldName]: fieldValue,
          };
    
          console.log(updatedCourtInfo);
    
          return updatedCourtInfo;
        });
    };


    useEffect(() => {
        const allFieldsFilled = Object.values(courtInfo).every(
          (field) => field !== null && field !== undefined && field !== ''
        );
        setButtonEnabled(allFieldsFilled);
      }, [courtInfo]);


    return (
        <>
        {true ? (
        false ? (<CustomLoader />) : (
            <Container sx={{ mb: 2 }}>
            <Paper sx={PaperSXX}>
                <Box sx={{ ...BoxSX }}>
                <Typography variant="h5" color="primary.main">
                    Crear nueva cancha
                </Typography>
                </Box>
                <Grid container>
                <Grid item xs={12} md={6}>
                    <Container>
                    <Typography variant="h6" mt={2} color="primary.main">
                        Datos de la cancha a crear
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 2 }} />
                    <Grid container spacing={2}>

                        <Grid item xs={6}>
                        <Autocomplete
                            id="name"
                            disablePortal
                            fullWidth
                            freeSolo
                            options={options}
                            onInputChange={(event, value) => handleInputChange("name")(event, value)}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Crear Nombre"
                                id="custom-css-outlined-input"
                                sx={{ mt: 2 }}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                        <StadiumOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            )}
                            />
                        </Grid>
                        
                                
                        <Grid item xs={6}>
                            <Autocomplete
                                id="activity"
                                disablePortal
                                fullWidth
                                options={Object.values(activities)}
                                getOptionLabel={(option) => option || ''}
                                onChange={(event, value) => handleInputChange("activity")(event, value)}
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
                        </Grid>

                        <Grid item xs={12} >
                        <Autocomplete
                                id="court"
                                disablePortal
                                fullWidth
                                options={courtType}
                                getOptionLabel={(option) => option || ''}
                                onChange={(event, value) => handleInputChange("court")(event, value)}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    label="Elegir Suelo"
                                    id="custom-css-outlined-input"
                                    sx={{ mt: 2 }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                            <GrassOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                        ),
                                    }}
                                    />
                                )}
                            />
                        </Grid>


                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                        <Autocomplete
                                id="inside"
                                disablePortal
                                fullWidth
                                options={Object.values(inside)}
                                getOptionLabel={(option) => option || ''}
                                onChange={(event, value) => handleInputChange("inside")(event, value)}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    label="¿Es techada?"
                                    id="custom-css-outlined-input"
                                    sx={{ mt: 2 }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                            <OtherHousesOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                        ),
                                    }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    </Container>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Container>
                        <Typography variant="h6" mt={2} color="primary.main">
                        Tus canchas
                        </Typography>
                        <Divider sx={{ mt: 1, mb: 2 }} />
                        {Object.entries(groupedCourts).map(([activityKey, courts]) => (
                        <Accordion key={activityKey}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" color={"secondary.main"}>{activityKey}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <List>
                                {courts.map((court) => (
                                <Typography key={court.id} variant="body1">
                                    {court.name}
                                </Typography>
                                ))}
                            </List>
                            </AccordionDetails>
                        </Accordion>
                        ))}
                        <Button
                            variant="contained"
                            fullWidth
                            disabled={!isButtonEnabled}
                            onClick={handleCreateCourt}
                            sx={{ ...ButtonSX, my: 2 }}
                        >
                            Crear cancha
                        </Button>
                    </Container>
                </Grid>
                </Grid>
            </Paper>
            </Container>
        )

        ) : (
        <>
        <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        className='content'
        >
            <Typography variant='h5' color='primary.main'>
            ¡Ups! Parece que no has iniciado sesion.
            </Typography>
        </Box>
        </>
        )}
        </>
    );
    };

    export default CreateCourt;