import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  SvgIcon,
  Icon,
} from '@mui/material'
import { useMediaQuery } from '@mui/material'
import logoDesktop from '../../assets/logoDesktop2.svg'
import logoMobile from '../../assets/logoMobile2.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)')

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
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
