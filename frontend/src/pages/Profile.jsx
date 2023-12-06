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
  Alert,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { PaperSXX, BoxSX } from "../components/customMui/CustomMui";
import { useUserContext } from "../hooks/userContext";
import { ButtonSX } from "../components/customMui/CustomMui";
import axiosInstance from "../hooks/api/axiosConfig";
import { Visibility, VisibilityOff, CallMade } from "@mui/icons-material";
import CustomLoader from "../components/CustomLoader";
import { updateUser } from "../hooks/api/userApi";
import axios from "axios";
import { Link } from "@mui/material";

const Profile = () => {
  const { user } = useUserContext();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [helperText, setHelperText] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axiosInstance.get(`/user/search-email?email=${user.email}`);
        const { userId, firstName, lastName, email, userName, neighborhood } = userResponse.data;
        setUserInfo({ userId, firstName, lastName, email, userName, neighborhood });
        setSelectedNeighborhood(neighborhood);
        const neighborhoodsResponse = await axiosInstance.get('/neighborhood/');
        setNeighborhoods(neighborhoodsResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, [loading])

 const showHelperText = () => {
  setHelperText(false);
 }

const handleInputChange = (fieldName, value) => {
  setUpdatedInfo((prevInfo) => ({
    ...prevInfo,
    userId: userInfo.userId,
    [fieldName]: value,
  }));
};

const validateFields = () => {
  for (const key in updatedInfo) {
    if (!updatedInfo[key]) {
      return false; 
    }
  }
  return true; 
};

const handleSaveClick = async () => {
  try {
    if(validateFields()){
      await updateUser(updatedInfo);
      console.log(updatedInfo);
      setAlertSuccess(true)
    } else {
      console.log('Por favor, completa todos los campos');
      setAlertError(true)
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};



  return (
    <>
    {user ? (
      loading ? (<CustomLoader />) : (
        <Container sx={{ mb: 2 }}>
          <Paper sx={PaperSXX}>
            <Box sx={{ ...BoxSX }}>
              <Typography variant="h5" color="primary.main">
                {userInfo.firstName} {userInfo.lastName}
              </Typography>
            </Box>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Container>
                  <Typography variant="h6" mt={2} color="primary.main">
                    Tus datos
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6} >
                      <TextField
                        required
                        id="outlined-required"
                        label="Nombre"
                        defaultValue={userInfo.firstName}
                        fullWidth
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Apellido"
                        defaultValue={userInfo.lastName}
                        fullWidth
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField
                        required
                        disabled
                        id="outlined-required"
                        label="Email"
                        defaultValue={userInfo.email}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Usuario"
                        defaultValue={userInfo.userName}
                        fullWidth
                        onChange={(e) => handleInputChange('userName', e.target.value)}

                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        disabled
                        type='password'
                        defaultValue={'default'}
                        helperText={helperText ? '' : 'Puedes cambiar tu contraseña desde el icono'}
                        onClick={showHelperText}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton href='/forgot-password' edge="end">
                                <CallMade />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        label="Password"
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <Autocomplete
                        id="nhood"
                        disablePortal
                        fullWidth
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={selectedNeighborhood || null }
                        getOptionLabel={(option) => option.name}
                        options={neighborhoods}
                        onChange={(event, value) => {
                          handleInputChange('neighborhood', value),
                          setSelectedNeighborhood(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Elegir Barrio"
                            id="custom-css-outlined-input"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSaveClick}
                        sx={{ ...ButtonSX, mb: 2 }}>
                        Guardar Cambios
                      </Button>
                      {alertError && (
                      <Alert sx={{mb: 2}} onClose={() => {setAlertError(false)}} variant="outlined" severity="error">
                        Debes completar todos los campos
                      </Alert>)}
                      {alertSuccess && (
                        <Alert  sx={{mb: 2}} onClose={() => {setAlertSuccess(false)}} variant="outlined" severity="success">
                          ¡Datos actualizados!
                        </Alert>
                      )}
                     
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                  <Typography variant="h6" mt={2} color="primary.main">
                    Tus eventos
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 2 }} />
                  <Typography variant="body1">¡Ups! parece que no te has inscripto a ningun evento</Typography>
                  <Link href='/disponibility'>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ ...ButtonSX, my: 2 }}>
                    Crear evento
                  </Button>
                  </Link>
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

export default Profile;
