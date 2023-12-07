import React, { useState, useEffect } from 'react';
import { useUserContext } from '../hooks/userContext';
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  InputLabel,
  Select,
  ListItemText,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';
import { PaperSXX, BoxSX, ButtonSX,CustomButton } from "../components/customMui/CustomMui";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import axiosInstance from "../hooks/api/axiosConfig";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomLoader from "../components/CustomLoader";

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const FormGroupStyled = styled(FormGroup)({
  display: 'flex',
  flexWrap: 'wrap',
});

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const days = [
  { id: 1, name: 'Lunes' },
  { id: 2, name: 'Martes' },
  { id: 3, name: 'Miércoles' },
  { id: 4, name: 'Jueves' },
  { id: 5, name: 'Viernes' },
  { id: 6, name: 'Sábado' },
  { id: 7, name: 'Domingo' },
];

const Slot = () => {
  const {id} = useParams();
  const [clubId, setClubId] = useState('');
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { user } = useUserContext();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);

  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/search-email?email=${user.email}`);
        setUserInfo(response.data);
        
        if (response.data.role !== 'ROLE_CLUB' ){
                       
            alert("No tiene permiso para acceder a esta página.");
            window.location.href = "/";
        }
        axiosInstance.get(`/club/by-name/${response.data.firstName}`)
        .then((response) => {
          
          setClubId(response.data.id);
          if(response.data.id !== parseInt(id)){
            alert("No tiene permiso para acceder a esta página.");
            window.location.href = "/";
          }
          axiosInstance.get(`/club/${response.data.id}`)
        .then((response) => {
        
        const club = response.data;

      
        const activities = club.activities;
        const canchasData = [];

        activities.forEach((activity) => {
          activity.courts.forEach((court) => {
            const canchaData = {
              cancha: court.name,
              id: court.id,
              conjuntosDias: [],
            };

            court.slots.forEach((slot) => {
              const conjuntoDias = slot.days.map((day) => days[day.id - 1].name).sort((a, b) => {
                const dayA = days.find((day) => normalizeString(day.name) === normalizeString(a));
                const dayB = days.find((day) => normalizeString(day.name) === normalizeString(b));
                return dayA.id - dayB.id;
              }).join(", ");
              const horario = `${slot.startTime} - ${slot.endTime}`;

              // Verificar si el conjunto de días ya existe en el arreglo
              const conjuntoExistente = canchaData.conjuntosDias.find((conjunto) => conjunto.dias === conjuntoDias);
              if (conjuntoExistente) {
                conjuntoExistente.horarios.push({ id: slot.id, horario });
              } else {
                canchaData.conjuntosDias.push({ dias: conjuntoDias, horarios: [{ id: slot.id, horario }] });
              }
            });

            canchasData.push(canchaData);
          });
        });

        setCanchas(canchasData);
        setLoading(false);
      })
      .catch((error) => console.error(error));
          
        })
        
        
      } catch (error) {
        setError(error);
      }
    };

    if (user) {
      fetchData();
    } else {
        alert("No tiene permiso para acceder a esta página.");
            window.location.href = "/";
    }
  }, [user]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    
  if (location.pathname === '/') {
    navigate(-1);
  } else {
    navigate('/');
  }
  };

  useEffect(() => {
    
  }, [clubId]);

  const handleDeleteSlot = () => {
    // Enviar petición DELETE al endpoint '/delete/{id}'
    axiosInstance
      .delete(`/slot/delete/${selectedSlot}`)
      .then((response) => {
        // Actualizar la lista de canchas después de eliminar el slot
        const updatedCanchas = canchas.map((cancha) => {
          const updatedConjuntosDias = cancha.conjuntosDias.map((conjunto) => {
            const updatedHorarios = conjunto.horarios.filter((horario) => horario.id !== selectedSlot);
            return { ...conjunto, horarios: updatedHorarios };
          });
          return { ...cancha, conjuntosDias: updatedConjuntosDias };
        });
        setCanchas(updatedCanchas);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setDialogOpen(false);
        setSelectedSlot(null);
      });
  };

  const handleOpenDialog = (slotId) => {
    setDialogOpen(true);
    setSelectedSlot(slotId);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSlot(null);
  };

  const handleAddSlot = () => {
    const daysToAdd = selectedDays.map((day) => ({ id: day }));
    const slotData = {
      court: { id: selectedCourt },
      capacity: 10,
      days: daysToAdd,
      startTime: startTime,
      endTime: endTime,
    };
  
    axiosInstance
      .post('/slot/add', slotData)
      .then((response) => {
        // Actualizar la lista de canchas después de agregar el slot
        const updatedCanchas = canchas.map((cancha) => {
          if (cancha.id === selectedCourt) {
            const conjuntoDias = daysToAdd.map((day) => days[day.id - 1].name).sort((a, b) => {
              const dayA = days.find((day) => normalizeString(day.name) === normalizeString(a));
              const dayB = days.find((day) => normalizeString(day.name) === normalizeString(b));
              return dayA.id - dayB.id;
            }).join(", ");
            const horario = `${startTime} - ${endTime}`;
            const conjuntoExistente = cancha.conjuntosDias.find((conjunto) => conjunto.dias === conjuntoDias);
            if (conjuntoExistente) {
              conjuntoExistente.horarios.push({ id: response.data.id, horario });
            } else {
              cancha.conjuntosDias.push({ dias: conjuntoDias, horarios: [{ id: response.data.id, horario }] });
            }
          }
          return cancha;
        });
        setCanchas(updatedCanchas);
      })
      .catch((error) => console.error(error));
  
    setSelectedDays([]);
    setSelectedCourt('');
    setStartTime('');
    setEndTime('');
  };

  // const handleDaySelection = (event) => {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     setSelectedDays((prevSelectedDays) => [...prevSelectedDays, value]);
  //   } else {
  //     setSelectedDays((prevSelectedDays) => prevSelectedDays.filter((day) => day !== value));
  //   }
  // };

  const handleDaySelection = (event) => {
    setSelectedDays(event.target.value);
  };
  

  const handleCourtSelection = (event) => {
    const selected = event.target.value;
    setSelectedCourt(selected);
  };

  const handleStartTimeChange = (event) => {
    const value = event.target.value;
    setStartTime(value);
  };

  const handleEndTimeChange = (event) => {
    const value = event.target.value;
    setEndTime(value);
  };


  if (loading) {
    return <CustomLoader />;
  }


  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : 
      
      (
        
        <Paper sx={PaperSXX}>
        <Box sx={BoxSX}>
          <Typography variant="h5" color="primary.main">
            Turnos en tus canchas
          </Typography>
          </Box>
          <Accordion expanded={expanded} onChange={handleAccordionChange} sx={{backgroundColor:'background.default'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ fontSize: 32 }}/>} aria-controls="panel1a-content" id="panel1a-header" sx={{height:'80px'}}>
              <Typography variant="h6" color="secondary.main">
                Ver turnos cargados
              </Typography>
          </AccordionSummary>
          <AccordionDetails >
          <Paper sx={PaperSXX}>
          <TableContainer >
            <Table>
              <TableHead>
                <TableRow sx={{backgroundColor:'background.default'}} >  
                  <TableCell sx={{borderRadius: '10px 0 0 0'}}><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Cancha</Typography></TableCell>
                  <TableCell sx={{borderRadius: '0 10px 0 0'}}><Typography variant="h5" color="secondary.main" sx={{fontSize:'16px'}}>Conjunto de Días</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {canchas.map((cancha, index) => (
                  <TableRow key={index}>
                    <TableCell>{cancha.cancha}</TableCell>
                    <TableCell>
                      {cancha.conjuntosDias.map((conjunto) => (
                        <div key={conjunto.dias}>
                          <strong>{conjunto.dias}:</strong>
                          {conjunto.horarios.map((horario) => (
                            <div key={horario.id} style={{ display: 'flex', alignItems: 'center' }}>
                              <div>{horario.horario}</div>
                              <IconButton onClick={() => handleOpenDialog(horario.id)}>
                                <DeleteIcon />
                              </IconButton>
                              <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                                <DialogTitle>Eliminar Horario</DialogTitle>
                                <DialogContent>
                                  <Typography variant="body1">¿Estás seguro de que deseas eliminar este horario?</Typography>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseDialog}>Cancelar</Button>
                                  <Button onClick={handleDeleteSlot} color="error">Eliminar</Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          ))}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>
          </AccordionDetails>
        </Accordion>




          <FormContainer>
              <Typography  color="white" sx={{fontSize:'16px'}}>
                Agregar Franja Horaria
              </Typography>
          
            <Grid container>
            <FormControlStyled fullWidth>
              <InputLabel>Días</InputLabel>
              <Select
                multiple
                value={selectedDays}
                onChange={handleDaySelection}
                renderValue={(selected) => selected.join(', ')}
              >
                {days.map((day) => (
                  <MenuItem key={day.id} value={day.id}>
                    <Checkbox checked={selectedDays.includes(day.id.toString())} />
                    <ListItemText primary={day.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControlStyled>
              <FormControlStyled fullWidth>
                <InputLabel>Cancha</InputLabel>
                <Select value={selectedCourt} onChange={handleCourtSelection}>
                  {canchas.map((cancha) => (
                    <MenuItem key={cancha.id} value={cancha.id}>
                      {cancha.cancha}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlStyled >
              <Grid container spacing={2} m={0}>
                <Grid item xs={3}>
                  <TextField
                    label="Horario de Inicio"
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Horario de Fin"
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // Intervalo de 5 minutos
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container m={4} justifyContent="space-between" alignItems="center" >
                <Button onClick={handleAddSlot} sx={{...ButtonSX}} >
                  Agregar
                </Button>
                <Button onClick={handleGoBack} sx={{...ButtonSX}}>
                  Volver a reservas
                </Button>
              </Grid>
            </Grid>
          </FormContainer>






        </Paper>
        
      )}


    </Container>
    
  );
};

export default Slot;