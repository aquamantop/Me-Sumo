import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Container, Paper, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { PaperSXX, CustomTextField, ButtonSX } from "../components/customMui/CustomMui";

const EventCreate = () => {
    return (
        <>
            <Container className="content">
                <Paper sx={{ ...PaperSXX, textAlign: "center" }} >
                    <Box
                        sx={{
                            border: "2px solid",
                            borderColor: "secondary.main",
                            borderRadius: "10px",
                            margin: "-2px",
                            position: "relative",
                            zIndex: 1,
                            p: 2,
                        }}
                    >
                        <Typography variant="h5" color="primary.main">
                            Informacion del Evento
                        </Typography>
                        
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box 
                            display="flex"
                            flexDirection="column"
                            m={2}
                            >
                            <CustomTextField label="Club" margin="normal"/>
                            <CustomTextField label="Actividad" margin="normal"/>
                            <CustomTextField label="Fecha" margin="normal" />
                            <CustomTextField label="Barrio" margin="normal"/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box 
                            display="flex" 
                            flexDirection="column"
                            m={2}
                            >
                            <CustomTextField label="Cupo" margin="normal"/>
                            <CustomTextField 
                            label="Mensaje del organizador"
                            multiline
                            rows={4}
                            margin="normal"
                            />
                            </Box>
                        </Grid>
                    </Grid>
                    <Button
                    variant="contained"
                    color="secondary"
                    sx={{ my:2 }}
                    >
                    Crear evento
                    </Button>
                </Paper>
            </Container>
        </>
    );
};

export default EventCreate;
