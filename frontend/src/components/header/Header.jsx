import React from 'react'
import { AppBar, Toolbar, Typography, Button, SvgIcon, Icon } from '@mui/material';
import {useMediaQuery} from '@mui/material';
import logoDesktop from '../../assets/logoDesktop2.svg';
import logoMobile from '../../assets/logoMobile2.svg';
import { Link } from "react-router-dom";

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  
  return (
    <AppBar position="fixed" sx={{background:'#03081B'}}>
      <Toolbar sx={{mx:2, p:0}}>
        {isMobile ? (
          <Link to='/'>
            <img src={logoMobile} alt="Mobile Logo" style={{maxWidth: '100px'}}/>
          </Link>
          ) : (
            <Link to='/'>
              <img src={logoDesktop} alt="Desktop Logo" style={{maxWidth: '100px' }} />
            </Link>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <Button variant='outlined' sx={{ml:2}}>Registrarse</Button>
        <Button variant='outlined' sx={{ml:2}}>Iniciar sesión</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header;