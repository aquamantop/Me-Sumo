import React from 'react'
import { AppBar, Toolbar, Typography, Button, SvgIcon, Icon } from '@mui/material';
import {useMediaQuery} from '@mui/material';
import logoDesktop from '../../assets/logoDesktop.svg';
import logoMobile from '../../assets/logoMobile.svg';

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  
  return (
    <AppBar position="fixed" sx={{background:'#03081B'}}>
      <Toolbar sx={{p:1}}>
        {isMobile ? (
          <img src={logoMobile} alt="Mobile Logo" style={{maxWidth: '100px'}}/>
          ) : (
          <img src={logoDesktop} alt="Desktop Logo" style={{maxWidth: '100px' }} />
        )}
        {/* <img src={LogoMeSumo} alt="Logo MeSumo" style={{ maxWidth: '100px' }} /> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <Button variant='outlined' sx={{mx:2}}>Registrarse</Button>
        <Button variant='outlined'>Iniciar sesión</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header;