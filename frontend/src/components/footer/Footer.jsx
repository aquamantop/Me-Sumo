import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <AppBar position='sticky' sx={{
      top: 'auto',
      bottom: 0,
      background: 'linear-gradient(to bottom, #D6FF4E, #5DBE7A, #3E8059)',
    }}>
      <Toolbar sx={{justifyContent:'space-between'}}>
        <Typography 
        variant="body2" 
        fontStyle="italic" 
        sx={{ 
            flexGrow: 1,
            display: 'flex',
            justifyContent:'center',
            fontSize: {xs: 20, sm: 30},
             }}>
          Tus ganas de jugar, ya no se postergan
        </Typography>
        <div>
            <IconButton color="inherit">
            <InstagramIcon />
            </IconButton>
            <IconButton color="inherit">
            <TwitterIcon />
            </IconButton>
            <IconButton color="inherit">
            <FacebookIcon />
            </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;