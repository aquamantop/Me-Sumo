import {
    Container,
    Paper,
    Typography,
    Box,
    Divider,
    TextField,
    Grid,
    Autocomplete,
    Button
} from "@mui/material";
import React from "react";
import { PaperSXX, BoxSX } from "../components/customMui/CustomMui";
import { useUserContext } from "../hooks/userContext";
import { ButtonSX } from "../components/customMui/CustomMui";
import { Link } from "@mui/material";

const Profile = () => {
    return (
        <>
            <Container sx={{ mb: 2 }}>
                <Paper sx={PaperSXX}>
                    <Box sx={{ ...BoxSX }}>
                        <Typography variant="h5" color="primary.main">
                            Usuario
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
                                        defaultValue="Lionel"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Apellido"
                                        defaultValue="Messi"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={12}>
                                    <TextField
                                        required
                                        disabled
                                        id="outlined-required"
                                        label="Email"
                                        defaultValue="messikpo@gmail.com"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Usuario"
                                        defaultValue="liocrack"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Contraseña"
                                        defaultValue="antoteamo"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={12}>
                                    <Autocomplete
                                        id="nhood"
                                        disablePortal
                                        fullWidth
                                        // options={neighborhoods}
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
                                  sx={{...ButtonSX, mb:2}}>
                                      Guardar Cambios
                                  </Button>
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
                                sx={{...ButtonSX, my: 2}}>
                                    Crear evento
                              </Button>
                            </Link>
                        </Container>
                      </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default Profile;
