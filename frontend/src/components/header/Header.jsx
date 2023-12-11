import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  SvgIcon,
  Icon,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Drawer,
  Container,
  Divider,
  IconButton
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import logoDesktop from '../../assets/logoDesktop2.svg';
import logoMobile from '../../assets/logoMobile2.svg';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/userContext';
import { BoxSX, MenuListSX, PaperSXX } from '../customMui/CustomMui';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../hooks/api/axiosConfig';
import { Logout, Portrait, Assessment, Upload, Book, Login, Face} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { user, logoutUser } = useUserContext();
  const [menuInfo, setMenuInfo] = useState([
    { label: 'Mi Perfil', link: '/profile' },
    { label: 'Cerrar Sesión', link: '/' },
  ]);
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const fetchAndSetUserInfo = async (email) => {
    try {
      const userResponse = await axiosInstance.get(`/user/search-email?email=${email}`);
      const { firstName, lastName, userName } = userResponse.data;
      setUserInfo({ firstName, lastName, userName });
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const getInitialMenuInfo = (role) => {
    if (role === 'ROLE_CLUB') {
      return [
        { label: 'Reservas', link: '/booking/' + user.clubId },
        { label: 'Cargar Cancha', link: '/new-court' },
        { label: 'Cerrar Sesión', link: '/' },
      ];
    } else if (role === 'ROLE_ADMIN') {
      return [
        { label: 'Reporte', link: '/reports' },
        { label: 'Cargar Club', link: '/new-club' },
        { label: 'Cerrar Sesión', link: '/' },
      ];
    } else if (role === 'ROLE_USER') {
      return [
        { label: 'Mi Perfil', link: '/profile', icon: 'Portrait' },
        { label: 'Cerrar Sesión', link: '/', icon: 'Logout' },
      ];
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetchAndSetUserInfo(user.email);
      const roleBasedMenu = getInitialMenuInfo(user.role);
      setMenuInfo(roleBasedMenu);
    }
  }, [user]);



  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleMenuCloseAndNavigate = (link) => {
    console.log(link)
    setAnchorEl(null);
    window.location.href = link;
  };

  const handleLogout = () => {
    logoutUser();
    handleMenuClose();
  };

  return (
    <AppBar
      position='sticky'
      sx={{
        background:
          'linear-gradient(180deg, #0D2430 0%, rgba(13, 36, 48, 0) 30%)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }}
    >
      <Toolbar
        sx={{ mx: 2, p: 0, display: 'flex', justifyContent: 'space-between' }}
      >
        {isMobile ? (
          <Tooltip title='Inicio' placement='bottom-end'>
            <Link to='/'>
              <img
                src={logoMobile}
                alt='Mobile Logo'
                style={{ maxWidth: '100px' }}
              />
            </Link>
          </Tooltip>
        ) : (
          <Tooltip title='Inicio'  placement='bottom-end'>
            <Link to='/'>
              <img
                src={logoDesktop}
                alt='Desktop Logo'
                style={{ maxWidth: '100px' }}
              />
            </Link>
          </Tooltip>
        )}
        <Box>
          {user ? (
            <>
              <Box
                onClick={handleMenuOpen}
                sx={{
                  ...BoxSX,
                  borderColor: 'primary.main',
                  m: 0,
                  height: '35px',
                  display: 'flex',
                  minWidth: '200px',
                  gap: '8px',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography variant='body1' color='primary.main' align='inherit'>
                  ¡Hola {userInfo.firstName}!
                </Typography>
                <Avatar onClick={handleDrawerOpen} sx={{ cursor: 'pointer', bgcolor: 'primary.main' }}>{userInfo.firstName?.[0] ?? ''}</Avatar>
                {/* <Avatar onClick={handleMenuOpen} sx={{ cursor: 'pointer' }}></Avatar> */}
              </Box>
              <Drawer 
                anchor="right" 
                open={isDrawerOpen} 
                onClose={handleDrawerClose}
                sx={{
                  backdropFilter: 'blur(3px)',
                  WebkitBackdropFilter: 'blur(3px)',
                          }}
                PaperProps={{
                  sx:{
                    borderLeft: "2px solid",
                    borderColor: "secondary.main",
                    // background: "linear-gradient(180deg, #0D2430 0%, rgba(13, 36, 48, 0) 100%)",
                    background: 'rgba(13, 36, 48, 0.95)'
                  }
                  
                }}
                >
                  <Container
                    role="presentation"
                    onClick={handleDrawerClose}
                    onKeyDown={handleDrawerClose}
                    maxWidth={false}
                    sx={{width: '270px', pl: '0px!important', pr: '0px!important'}}
                  >
                    <Box
                      sx={{
                        height:'71.5px',
                        display: 'flex',
                        justifyContent: 'space-evenly'
                      }}
                      p={2}
                    >
                      <Avatar 
                        sx={{
                          bgcolor: 'secondary.main',
                          width: 50,
                          height: 50
                          }}>{userInfo.firstName?.[0] ?? ''}</Avatar>
                      <Box>
                        <Typography variant='h6' sx={{my:1}} color='secondary'>{userInfo.firstName} {userInfo.lastName}</Typography>
                        <Typography variant='h6' color='secondary'>@{userInfo.userName}</Typography>
                      </Box>


                    </Box>
                    <Divider sx={{ my: 1 }} />
                    {menuInfo.map((option) => (
                      <Link
                        to={option.link}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        key={option.label}
                      >
                        <MenuItem
                          sx={{mb:1}}
                          onClick={
                            option.label === 'Cerrar Sesión' ? handleLogout : handleDrawerClose
                          }
                        >
                          {option.label === 'Reservas' && <Book sx={{mr:1}}/>} 
                          {option.label === 'Cargar Cancha' && <Upload sx={{mr:1}}/>} 
                          {option.label === 'Reporte' && <Assessment sx={{mr:1}}/>} 
                          {option.label === 'Mi Perfil' && <Portrait sx={{mr:1}}/>} 
                          {option.label === 'Cerrar Sesión' && <Logout sx={{mr:1}}/>} 
                          <Typography variant='h6'>{option.label}</Typography>
                        </MenuItem>
                      </Link>
                    ))}
                  </Container>
                </Drawer>
            </>
          ) : (
            isMobile ? (
              <>
              <Box
                sx={{
                  ...BoxSX,
                  borderColor: 'primary.main',
                  p: 0
                }}
              >
                <Button 
                  sx={{ p: 1}}
                  onClick={handleDrawerOpen}
                >
                  <MenuIcon/>
                </Button>
              </Box>
              <Drawer
                open={isDrawerOpen} 
                onClose={handleDrawerClose}
                anchor="right"
                sx={{
                  backdropFilter: 'blur(3px)',
                  WebkitBackdropFilter: 'blur(3px)',
                          }}
                PaperProps={{
                  sx:{
                    borderLeft: "2px solid",
                    borderColor: "secondary.main",
                    // background: "linear-gradient(180deg, #0D2430 0%, rgba(13, 36, 48, 0) 100%)",
                    background: 'rgba(13, 36, 48, 0.95)'
                  }
                  
                }}
              >
                <Container
                    role="presentation"
                    onClick={handleDrawerClose}
                    onKeyDown={handleDrawerClose}
                    maxWidth={false}
                    sx={{width: '270px', pl: '0px!important', pr: '0px!important'}}
                  >
                    <Box
                      sx={{
                        height:'71.5px',
                        display: 'flex',
                        alignItems: 'flex-end'
                      }}
                      p={2}
                    >
                      <Typography variant='h5' color='secondary' >Menú</Typography>
                    </Box>
                    <Divider sx={{ my: 1}} />
                      <Link
                        to='/login'
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <MenuItem sx={{mb:1}}>
                          <Login sx={{mr: 1}}/>
                          <Typography variant='h6'>Iniciar sesión</Typography>
                        </MenuItem>
                      </Link>
                      <Link
                        to='/register'
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <MenuItem sx={{mb:1}}>
                          <Face sx={{mr: 1}}/>
                          <Typography variant='h6' >Registrase</Typography>
                        </MenuItem>
                      </Link>
                  </Container>
              </Drawer>
              </>
            ) : (
              <>
                <Link to='/register'>
                  <Button variant='outlined' sx={{ ml: 2 }}>
                    Registrarse
                  </Button>
                </Link>
                <Link to='/login'>
                  <Button variant='outlined' sx={{ ml: 2 }}>
                    Iniciar sesión
                  </Button>
                </Link>
              </>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
