import React, { useState } from 'react'
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
} from '@mui/material'
import { useMediaQuery } from '@mui/material'
import logoDesktop from '../../assets/logoDesktop2.svg'
import logoMobile from '../../assets/logoMobile2.svg'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../hooks/userContext'
import { BoxSX, MenuListSX, PaperSXX } from '../customMui/CustomMui'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const isMobile = useMediaQuery('(max-width:600px)')
  const {user, logoutUser} = useUserContext();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='sticky' sx={{ background: '#03081B' }}>
      <Toolbar
        sx={{ mx: 2, p: 0, display: 'flex', justifyContent: 'space-between' }}
      >
        {isMobile ? (
          <Link to='/'>
            <img
              src={logoMobile}
              alt='Mobile Logo'
              style={{ maxWidth: '100px' }}
            />
          </Link>
        ) : (
          <Link to='/'>
            <img
              src={logoDesktop}
              alt='Desktop Logo'
              style={{ maxWidth: '100px' }}
            />
          </Link>
        )}
        <Box>
          { user ? (
            <>
              <Box 
              sx={{
                ...BoxSX,
                borderColor: 'primary.main',
                m: 0,
                height: '35px',
                display: 'flex',
                gap:'8px',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              >
                <Typography variant='body1' color='primary.main' align='inherit'>
                  {user.email.split("@")[0]}
                </Typography>
                <Avatar onClick={handleMenuOpen} sx={{cursor: 'pointer',}}></Avatar>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              > <Link to='/profile' style={{textDecoration: 'none', color: 'inherit'}}>
                  <MenuItem sx={MenuListSX} onClick={handleMenuClose}>Editar Perfil</MenuItem>
                </Link>
                <MenuItem sx={MenuListSX} onClick={() => logoutUser()}>Cerrar Sesión</MenuItem>
              </Menu>
            </>

          ):(
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
  )
}

export default Header