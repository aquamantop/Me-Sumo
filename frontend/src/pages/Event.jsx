import { ButtonSX } from "../components/customMui/CustomMui";
import { Container, Paper, Typography, Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { PaperSXX } from '../components/customMui/CustomMui'
import { useParams } from 'react-router';
import { useTheme } from '@mui/system';
import { useUserContext } from '../hooks/userContext'
import axiosInstance from "../hooks/api/axiosConfig";
import BoxMessage from '../components/BoxMessage'
import React, { useState, useEffect } from 'react'

const Booking = () => {
    const { id } = useParams();
    const theme = useTheme();

    const { user } = useUserContext();
    const [userInfo, setUserInfo] = useState({});
    const [isParticipant, setIsParticipant] = useState(false);
    const [isCreator, setIsCreator] = useState(false);

    const [cardInfo, setCardInfo] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const initialLoading = true
    
    const [boxOpen, setBoxOpen] = useState(false);
    const [boxTitle, setBoxTitle] = useState('');
    const [boxMessage, setBoxMessage] = useState('');
    

    const okMessage = {
        title: '¡Sumado!',
        message: 'Ya estás participando ;D'
    };

    const noOkMessage = {
        title: '¡Hola!',
        message: 'Tenés que estar logueado para sumarte al evento!'
    };

    
    const handleBoxClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setBoxOpen(false);
        setIsParticipant(true);
    };

    
    const showMessage = (data) => {
        setBoxTitle(data.title)
        setBoxMessage(data.message);
        setBoxOpen(true);
    };
  
    const handleAddParticipant = () => {
        if (user && !isParticipant) {
            axiosInstance.post(`/booking/participant/${id}`, userInfo,
                {
                    headers: { "Authorization": `Bearer ${user.token}` }
                }  
            )
            .then(response => {
                showMessage(okMessage);
                axiosInstance.get(`/booking/${id}`)
                .then(response => {
                    setCardInfo(prevCardInfo => ({
                        ...prevCardInfo,
                        bookingParticipants: response.data.participants, 
                    }))  

                    axiosInstance.get(`/slot/getWithCourt/${response.data.slotId}`).then((response) => {
                        const availability = response.data.capacity - cardInfo.bookingParticipants.length - 1;
                        setCardInfo((prevCardInfo) => ({
                            ...prevCardInfo,
                            bookingAvailability: availability,
                }));
                });
                setIsParticipant(true)
            })})
            .catch(error => {
                showMessage({message: 'Error al procesar la solicitud.'});
            });
        
        } else {
          showMessage(noOkMessage);
        }
    };

    const handleDeleteParticipant = () => {
        const participant = cardInfo.bookingParticipants.find(participant => participant.userId === userInfo.userId);
        if (user && isParticipant) {
            axiosInstance.delete(`/booking/participant/${id}`, 
                {
                    data: { id: participant.id },
                    headers: { "Authorization": `Bearer ${user.token}` }
                },
            )
            .then(response => {
                showMessage({message: 'Lamentamos no contar con vos'});
                axiosInstance.get(`/booking/${id}`)
                .then(response => {
                    setCardInfo(prevCardInfo => ({
                        ...prevCardInfo,
                        bookingParticipants: response.data.participants, 
                    }))  

                    axiosInstance.get(`/slot/getWithCourt/${response.data.slotId}`).then((response) => {
                        const availability = response.data.capacity - cardInfo.bookingParticipants.length + 1;
                        setCardInfo((prevCardInfo) => ({
                            ...prevCardInfo,
                            bookingAvailability: availability,
                    }));
                    })
                })
            setIsParticipant(false)
            })
            .catch(error => {
                showMessage({message: 'Error al procesar la solicitud.'});
            });
        } else {
          showMessage(noOkMessage);
        }
    };

    
    useEffect(() => {
        user && 
        axiosInstance.get(`/user/search-email?email=${user.email}`)
        .then((response) => {
            const { userId, firstName, lastName, email } = response.data;
            setUserInfo({ userId, firstName, lastName, email });
        })
        .catch((error) => setError(error)) 
    }, [loading])


    useEffect(() => {
        axiosInstance.get(`/booking/${id}`)
        .then((response) =>{
            const booking = response.data;
            const { creatorId } = response.data
            const isUserCreator = creatorId == userInfo.userId
            setIsCreator(isUserCreator)
            axiosInstance.get(`/slot/getWithCourt/${booking.slotId}`)
            .then((response) => {
                const { name, url } = response.data.court.club;
                const availability = response.data.capacity - booking.participants.length;
                const category = response.data.court.activity.name + " " + response.data.court.activity.type;
                const cardData = {
                    "clubName": name,
                    "bookingName":booking.name,
                    "bookingDate":booking.date,
                    "bookingStartTime":booking.startTime,
                    "bookingAvailability": availability,
                    "bookingCategory": category,
                    "bookingMessage": booking.message,
                    "clubUrl":url,
                    "bookingParticipants": booking.participants
                }
                setCardInfo(cardData);
                const isUserParticipant = cardData.bookingParticipants.some(participant => participant.userId === userInfo.userId);
                setIsParticipant(isUserParticipant);
                setLoading(false);
                return cardData;
            })
        })
        .catch((error) => setError(error)) 
    }, [loading, isParticipant])




    return (
    <>
    {!loading && (
        <>
            <Container className="content" sx={{my:0}}>
            <Paper sx={PaperSXX}>
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
                    <span style={{color: theme.palette.primary.main }}>Club: </span> 
                    <span style={{color: theme.palette.primary.main }}>{cardInfo.clubName}</span>
                </Typography>
                </Box>
                <Grid container spacing={2} >
                <Grid Grid item xs={12} sm={6}>
                    <Box
                    display="flex"
                    flexDirection="column"
                    m={2}                
                    >
                    <Typography variant="h6" color="primary.main">
                        <span style={{color: theme.palette.primary.main }}>Evento: </span> 
                        <span style={{color: theme.palette.secondary.main }}>{cardInfo.bookingCategory}</span>
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                        <span style={{color: theme.palette.primary.main }}>Fecha: </span>
                        <span style={{color: theme.palette.secondary.main }}>{cardInfo.bookingDate + " " + cardInfo.bookingStartTime}</span>
                    </Typography>
                    <Typography variant="h6" color="#FCBA7D">
                        Quedan {cardInfo.bookingAvailability} lugares
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                    display="flex"
                    flexDirection="column"
                    m={2}                 
                    >
                    <Typography variant="h6">
                        <span style={{color: theme.palette.primary.main }}>Mensaje del organizador:</span>
                        <br />
                        <span style={{color: "white" , fontStyle: 'italic', fontWeight:200 }}>{cardInfo.bookingMessage}</span>
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ textAlign: 'center', display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
                    <Typography variant="h6" color="primary.main">
                        Participantes Sumados
                    </Typography>
                    <TableContainer component={Paper} sx={{ width: '50%', maxHeight: '250px', overflowY: 'auto', borderRadius:'20px', background:'none' }}>
                        <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '14px', position: 'sticky', top: 0, background: theme.palette.background.default }}>
                            <Typography variant="h6" color="secondary.main" sx={{fontSize:'16px'}} >
                                Orden
                            </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: '14px', position: 'sticky', top: 0, background: theme.palette.background.default }}>
                            <Typography variant="h6" color="secondary.main" sx={{fontSize:'16px'}}>
                                Nombre
                            </Typography>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {cardInfo.bookingParticipants.map((participant, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{participant.firstName + " " + participant.lastName}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                </Grid>
                    <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
                    {
                        isParticipant ?  
                        <Button 
                        variant="contained"
                        color="background"
                        fullWidth
                        onClick={handleDeleteParticipant}
                        sx={{ ...ButtonSX }}
                        disabled={isCreator}
                        >
                        Me Bajo
                        </Button>  :          
                        <Button 
                        variant="contained"
                        color="background"
                        fullWidth
                        onClick={handleAddParticipant}
                        sx={{ ...ButtonSX }}
                        disabled={isCreator}
                        >
                        ¡Me Sumo!
                        </Button>
                    }    
                <BoxMessage
                    open={boxOpen}
                    title={boxTitle}
                    message={boxMessage}
                    onClose={handleBoxClose}
                />
                </Grid>
            </Paper>
            </Container>
        </>
        )
        }
    </>
  );
}

export default Booking