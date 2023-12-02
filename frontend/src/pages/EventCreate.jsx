import { Container, Paper, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { PaperSXX, CustomTextField, ButtonSX, CustomButton } from "../components/customMui/CustomMui";
import { useBookingContext } from '../hooks/bookingContext'

const EventCreate = () => {

    const { bookingInfo } = useBookingContext();
    
    const { selectedDate, selectedHour, clubId, courtId, activityId, clubName, neighborhoodName, activityName } = bookingInfo;

    const slotCapacity = activityName.slice(-1) * 2;

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
                            <CustomTextField name="clubName" label="Club" margin="normal" disabled={clubName} value={clubName?clubName:""}/>
                            <CustomTextField name="activityName" label="Actividad" margin="normal" disabled={activityName} value={activityName?activityName:""} />
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField name="date" label="Fecha" margin="normal" disabled={selectedDate} value={selectedDate?selectedDate:""}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField name="startTime" label="Hora" margin="normal" disabled={selectedHour} value={selectedHour?selectedHour:""}/>
                                </Grid>
                            </Grid>
                            <CustomTextField name="neighborhoodName" label="Barrio" margin="normal" disabled={neighborhoodName} value={neighborhoodName?neighborhoodName:""}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box 
                            display="flex" 
                            flexDirection="column"
                            m={2}
                            >
                            <CustomTextField name="participants" label="Cupo" margin="normal" disabled={slotCapacity} value={slotCapacity?slotCapacity:""}/>
                            <CustomTextField label="Nombre del evento" margin="normal"/>
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
                    sx={{ ...ButtonSX, my:2 }}
                    >
                    Crear evento
                    </Button>
                </Paper>
            </Container>
        </>
    );
};

export default EventCreate;
