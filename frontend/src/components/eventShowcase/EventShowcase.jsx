import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardHeader,
    Button,
    Paper
} from "@mui/material";
import EventCard from "../eventCard/EventCard";

function EventShowcase({keyword}) {
    return (
        
            <Container sx={{mb:2}}>
                <Paper
                    sx={{
                        border: "2px solid",
                        borderColor: "secondary.main",
                        borderRadius: "10px",
                        
                    }}
                >
                    <Box
                        sx={{
                            border: "2px solid",
                            borderColor: "secondary.main",
                            borderRadius: "10px",
                            margin: '-2px',
                            position: 'relative',
                            zIndex: 1,
                            p: 2,
                            
                        }}
                    >
                        <Typography variant="h5" color="primary.main">
                        Eventos que cierran en <span style={{ color: 'orange' }}>{keyword}</span> de una hora
                        </Typography>
                    </Box>
                    <Grid container >
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index} sx={{ padding: 2 }}>
                                <EventCard/>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
     
    );
}

export default EventShowcase;
