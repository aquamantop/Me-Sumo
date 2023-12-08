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
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import logoDesktop from '../../assets/logoDesktop2.svg';
import logoMobile from '../../assets/logoMobile2.svg';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/userContext';
import { BoxSX, MenuListSX, PaperSXX } from '../customMui/CustomMui';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../hooks/api/axiosConfig';

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

  const fetchAndSetUserInfo = async (email) => {
    try {
      const userResponse = await axiosInstance.get(`/user/search-email?email=${email}`);
      const { firstName } = userResponse.data;
      setUserInfo({ firstName });
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
        { label: 'Cerrar Sesión', link: '/' },
      ];
    } else if (role === 'ROLE_USER') {
      return [
        { label: 'Mi Perfil', link: '/profile' },
        { label: 'Cerrar Sesión', link: '/' },
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
                <Avatar onClick={handleMenuOpen} sx={{ cursor: 'pointer' }}></Avatar>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {menuInfo.map((option) => (
                  <Link
                    to={option.link}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    key={option.label}
                  >
                    <MenuItem
                      sx={MenuListSX}
                      onClick={
                        option.label === 'Cerrar Sesión' ? handleLogout : handleMenuClose
                      }
                    >
                      {option.label}
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
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
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;