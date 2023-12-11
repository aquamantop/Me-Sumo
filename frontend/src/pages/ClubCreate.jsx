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
  } from "@mui/material";
import { PaperSXX, BoxSX, ButtonSX } from "../components/customMui/CustomMui";
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import StadiumOutlinedIcon from '@mui/icons-material/StadiumOutlined';
import CustomLoader from "../components/CustomLoader";
import { useUserContext } from "../hooks/userContext";
import BoxMessage from '../components/BoxMessage';
import AddImages from '../components/admin/newClub/AddImage';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axiosInstance from '../hooks/api/axiosConfig';




const options = [];
const amenities  = {
    1:"Wi-Fi",
    2:"Vestuario",
    3:"Estacionamiento",
    4:"Ayuda Médica",
    5:"Parrilla",
    6:"Bar",
    7:"Restaurante",
    8:"Pileta",
    9:"Duchas",
    10:"Quincho",
    11:"Sauna",
    12:"Gradas",
    13:"Casilleros",
    14:"Seguridad",
    15:"TV",
    16:"Gimnasio"
}
const activities  = {
    1:"Fútbol 5",
    2:"Fútbol 6",
    3:"Fútbol 7",
    4:"Fútbol 8",
    5:"Fútbol 9",
    6:"Fútbol 11"
}




const CreateClub = () => {
  
    const { user } = useUserContext();
    const [isButtonEnabled, setButtonEnabled] = useState(false);
    const [clubData, setClubData] = useState(null);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [courtInfo, setCourtInfo] = useState({
        name: null,
        activity:null,
        court: null,
        inside: null,
    });

    useEffect(() => {
        const fetchNeighborhoods = async () => {
          try {
            const response = await axiosInstance.get('/neighborhood/');
            const neighborhoodNames = response.data.map((neighborhood) => neighborhood.name);
            setNeighborhoods(neighborhoodNames);
          } catch (error) {
            console.error('Error al obtener vecindarios:', error);
          }
        };
    
        fetchNeighborhoods();
      }, []);
    
    

    const handleSelectChange = (event) => {
        setSelectedNeighborhood(event.target.value);
    };
    

    const handleInputChange = (name) => (event, value) => {
        console.log("Selected Values:", value);
        setSelectedActivities(value);
    };


    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axiosInstance.get(`/court/club/${user.clubId}`);
    //         setClubData(response.data);
    //       } catch (error) {
    //         console.error('Error fetching club data:', error);
    //       }
    //     };    
    //     fetchData();
    // }, []);
    
    
    // const groupCourtsByActivity = () => {
    //     if (!clubData) return {};
   
    //     return clubData.reduce((groupedCourts, court) => {
    //       const key = `${court.activity.name} ${court.activity.type}`;
    
    //       if (!groupedCourts[key]) {
    //         groupedCourts[key] = [];
    //       }
    
    //       groupedCourts[key].push(court);
    
    //       return groupedCourts;
    //     }, {});
    // };
    
    
    // const groupedCourts = groupCourtsByActivity();
    
    
    // const sortedActivityKeys = Object.keys(groupedCourts).sort((a, b) => {
    //     const [nameA, typeA] = a.split(' ');
    //     const [nameB, typeB] = b.split(' ');
    
    //     if (nameA === nameB) {
    //       return parseInt(typeA) - parseInt(typeB);
    //     } else {
    //       return nameA.localeCompare(nameB);
    //     }
    // });


    // const handleCreateCourt = async () => {
    //     try {
    //         console.log(courtInfo)
    //         const body = {
    //             name: courtInfo.name,
    //             club: {id: user.clubId},
    //             activity: {id: courtInfo.activity},
    //             court_type : courtInfo.court,
    //             inside: courtInfo.inside,
    //             slots: [{}]
    //         }
    //         console.log(body)
    //         const response = await axiosInstance.post('/court/add', body,
    //          {headers: {
    //              "Authorization": `Bearer ${user.token}`
    //           }}        
    //         );        
            
    //         console.log(response.data);
    //         const updatedResponse = await axiosInstance.get(`/court/club/${user.clubId}`);
    //         setClubData(updatedResponse.data);
    //         setShowMessage(true);
    //         setResetForm(true);  
        
    //     } catch (error) {
    //         console.error('Error al crear la cancha:', error);
    //     }
    // };


    // const handleInputChange = (fieldName) => (event, value) => {
        
    //     let fieldValue = value || event.target.value;
    
    //     if (fieldName === 'activity') {
    //       const selectedActivityKey = Object.keys(activities).find(
    //         (key) => activities[key] === fieldValue
    //       );
    //       fieldValue = selectedActivityKey ? Number(selectedActivityKey) : null;
    //     }
    
    //     if (fieldName === 'inside') {
    //         fieldValue = fieldValue === 'SÍ' ? 1 : fieldValue === 'NO' ? 0 : null;
    //     }
        

    //     setCourtInfo((prevCourtInfo) => {
    //       const updatedCourtInfo = {
    //         ...prevCourtInfo,
    //         [fieldName]: fieldValue,
    //       };
    
    //       console.log(updatedCourtInfo);
    
    //       return updatedCourtInfo;
    //     });
    // };


    // useEffect(() => {
    //     const allFieldsFilled = Object.values(courtInfo).every(
    //       (field) => field !== null && field !== undefined && field !== ''
    //     );
    //     setButtonEnabled(allFieldsFilled);
    // }, [courtInfo]);


    // const resetFormValues = () => {
    //     setResetForm(false);
    //     setCourtInfo({
    //         name: null,
    //         activity: null,
    //         court: null,
    //         inside: null,
    //     });
    // };

    return (
        <>
        {true ? (
        false ? (<CustomLoader />) : (
            <Container sx={{ mb: 2 }} key={resetForm}>
            <Paper sx={PaperSXX}>
                <Box sx={{ ...BoxSX }}>
                    <Typography variant="h5" color="primary.main">
                        Crear nuevo club
                    </Typography>
                </Box>
                <Grid container>
                    <Grid item xs={12} >
                        <Container>
                            <Typography variant="h6" mt={2} color="primary.main">
                                Datos del club a crear
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
                                        // onInputChange={(event, value) => handleInputChange("name")(event, value)}
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
                                
                                <Grid item xs={6} >
                                    <Autocomplete
                                        id="nhood"
                                        disablePortal
                                        fullWidth
                                        options={neighborhoods}
                                        getOptionLabel={(option) => option || ''}
                                        // onChange={(event, value) => handleInputChange("court")(event, value)}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Elegir Barrio"
                                                id="custom-css-outlined-input"
                                            sx={{ mt: 2 }}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton>
                                                        <MapOutlinedIcon />
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
                                        id="description"
                                        disablePortal
                                        fullWidth
                                        freeSolo
                                        options={options}
                                        // onInputChange={(event, value) => handleInputChange("name")(event, value)}
                                        renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            label="Descripción del Club"
                                            id="custom-css-outlined-input"
                                            sx={{ mt: 2 }}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton>
                                                    <InfoOutlinedIcon />
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
                                        id="address"
                                        disablePortal
                                        fullWidth
                                        freeSolo
                                        options={options}
                                        // onInputChange={(event, value) => handleInputChange("name")(event, value)}
                                        renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            label="Dirección"
                                            id="custom-css-outlined-input"
                                            sx={{ mt: 2 }}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton>
                                                    <FmdGoodOutlinedIcon />
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
                                        id="amenity"
                                        disablePortal
                                        fullWidth
                                        options={Object.values(amenities)}
                                        getOptionLabel={(option) => option || ''}
                                        // onChange={(event, value) => handleInputChange("activity")(event, value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Elegir Amenities"
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


                                <Grid item xs={6}>
                                <Autocomplete
                                    id="activity"
                                    disablePortal
                                    fullWidth
                                    options={Object.values(activities)}
                                    getOptionLabel={(option) => option || ''}
                                    onChange={handleInputChange("activity")}
                                    value={selectedActivities}
                                    multiple
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
                                    {selectedActivities.length > 0 && (
                                        <p><Typography variant="h6" mt={2} color="secondary.main" sx={{fontSize:'16px'}}> <span style={{ textDecoration: 'underline' }}>Actividades seleccionadas:</span>  {selectedActivities.join(', ')}</Typography></p>
                                    )}
                                </Grid>



                                <Grid item xs={6} m={3}>
                                    <AddImages />
                                </Grid>


                                {/* <Grid item xs={6} sx={{ marginBottom: 2 }}>
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
                                </Grid> */}


                            </Grid>
                            <Button
                                variant="contained"
                                fullWidth
                                disabled={!isButtonEnabled}
                                // onClick={handleCreateCourt}
                                sx={{ ...ButtonSX, my: 2 }}
                            >
                                Crear club
                            </Button>
                        </Container>
                
                    </Grid>
                
                </Grid>
            </Paper>

            <BoxMessage
                open={showMessage}
                title="Cancha Creada"
                message="¡La cancha se ha creado con éxito!"
                onClose={() => {
                    setShowMessage(false);
                    resetFormValues();
                }}
            />
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

    export default CreateClub;