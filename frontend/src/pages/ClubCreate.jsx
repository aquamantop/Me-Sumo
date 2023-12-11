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
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axiosInstance from '../hooks/api/axiosConfig';
import { Margin } from '@mui/icons-material';

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
    const [neighborhoodsMap, setNeighborhoodsMap] = useState({});
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [idsActivities, setIdsActivities] = useState([]);
    const [idsAmenities, setIdsAmenities] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [urlImagen, setUrlImagen] = useState('');
    const [clubInfo, setClubInfo] = useState({
        name: null,
        neighborhood: [],
        description: null, 
        address: null,
        amenities: [],
        activities: [],
    });

    useEffect(() => {
        const fetchNeighborhoods = async () => {
          try {
            const response = await axiosInstance.get('/neighborhood/');
            setNeighborhoodsMap(response.data);
            
            const neighborhoodNames = response.data.map((neighborhood) => neighborhood.name);
            setNeighborhoods(neighborhoodNames);
          } catch (error) {
            console.error('Error al obtener vecindarios:', error);
          }
        };
    
        fetchNeighborhoods();
      }, [])

     const handleCreateClub = async () => {
         try {

            const amenitiesIds = selectedAmenities.map(item => {
                const idValue = Object.keys(amenities).find(key => amenities[key] === item);
                return { id: idValue };
            });
            const activitiesIds = selectedActivities.map(item => {
                const idValue = Object.keys(activities).find(key => activities[key] === item);
                return { id: idValue };
            });

            const body = {
                name: clubInfo.name,
                neighborhood: { id: clubInfo.neighborhood },
                address: clubInfo.address,
                activities: activitiesIds,
                description: clubInfo.description, 
                url: urlImagen,
                amenities: amenitiesIds
                
            }
       
             console.log(JSON.stringify(body))
             const response = await axiosInstance.post('/club/add', body,
              {headers: {
                  "Authorization": `Bearer ${user.token}`
               }}        
             );        
           
             console.log(response.data);
             /* const updatedResponse = await axiosInstance.get(`/court/club/${user.clubId}`);
             setClubData(updatedResponse.data); */
             setShowMessage(true);
             setResetForm(true);  
        
         } catch (error) {
             console.error('Error al crear el club:', error);
         }
     };

 
     const handleInputChange = (fieldName) => (event, value) => {

        
        let fieldValue = value || event.target.value;
    
        if (fieldName === 'activities') {
            setSelectedActivities(fieldValue);         
        }

        if (fieldName === 'amenity') {
            setSelectedAmenities(fieldValue);
        }

        if (fieldName === 'name') {
            setName(event.target.value);
        }

        if (fieldName === 'url') {
            setUrlImagen(event.target.value);
        }


        if (fieldName === 'description') {
            setDescription(event.target.value);
        }

        if (fieldName === 'address') {
            setAddress(event.target.value);
        }

        if (fieldName === 'neighborhood') {
            
            Object.keys(neighborhoodsMap).find(key => {
                
                if (neighborhoodsMap[key].name === value) {
                    fieldValue = neighborhoodsMap[key].id;
                                       
                    setSelectedNeighborhood(fieldValue);
                }
            })

        }                 
        
        if(fieldName !== 'activities' && fieldName !== 'amenity') {

         setClubInfo((prevClubInfo) => {
           const updatedClubInfo = {
             ...prevClubInfo,
             [fieldName]: fieldValue,
           };
    
           console.log(updatedClubInfo);
    
           return updatedClubInfo;
         });
        
        }
     }; 


     useEffect(() => {
         const allFieldsFilled = Object.values(clubInfo).every(
           (field) => field !== null && field !== undefined && field !== ''
         );
         setButtonEnabled(allFieldsFilled);
     }, [clubInfo]);


     const resetFormValues = () => {
         setResetForm(false);
         setClubInfo({
            name: null,
            neighborhood: [],
            description: null, 
            address: null,
            amenities: [],
            activities: [],
         });
     };

    //  const handleImageSelected = (imageUrl) => {
    //     // Lógica para manejar la URL seleccionada
    //     console.log('URL seleccionada:', imageUrl);
    //     setUrlImagen(imageUrl);
    //   };

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
                                
                            <Grid item xs={6} >
                              <Autocomplete
                                id="nhood"
                                disablePortal
                                fullWidth
                                options={neighborhoods}
                                getOptionLabel={(option) => option || ''}
                                onChange={(event, value) => handleInputChange("neighborhood")(event, value)}
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
                                onInputChange={(event, value) => handleInputChange("description")(event, value)}
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
                                    onInputChange={(event, value) => handleInputChange("address")(event, value)}
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
                                    onChange={(event, value ) => handleInputChange("amenity")(event, value)} 
                                    value={selectedAmenities}
                                    multiple
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
                                <Typography> Amenities seleccionadas: </Typography>
                                <ul>
                                    {selectedAmenities.map(item =>
                                    <li style={{margin:'-15px'}}>
                                    <><Typography variant="h6" mt={2} color="secondary.main" sx={{fontSize:'16px'}}> {item} </Typography></>
                                    </li>
                                )}</ul>
                            </Grid>

                            <Grid item xs={6}>
                            <Autocomplete
                                id="activities"
                                disablePortal
                                fullWidth
                                options={Object.values(activities)}
                                getOptionLabel={(option) => option || ''}
                                onChange={(event, value) => handleInputChange("activities")(event, value)}
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
                                <Typography> Actividades seleccionadas: </Typography>
                                <ul>
                                    {selectedActivities.map(item =>
                                    <li style={{margin:'-15px'}}>
                                    <><Typography variant="h6" mt={2} color="secondary.main" sx={{fontSize:'16px'}}> {item} </Typography></>
                                    </li>
                                )}</ul>
                            </Grid>

                            <Grid item xs={6}>
                              <Autocomplete
                                  id="url"
                                  disablePortal
                                  fullWidth
                                  freeSolo
                                  options={options}
                                  onInputChange={(event, value) => handleInputChange("url")(event, value)}
                                  renderInput={(params) => (
                                      <TextField
                                      {...params}
                                      label="Cargar URL de la imagen"
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


{/* 
                                <Grid item xs={6} m={3}>
                                    <AddImages onImageSelected={handleImageSelected} />
                                </Grid> */}


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
                                onClick={handleCreateClub}
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