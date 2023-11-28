import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Card, CardContent, CardMedia, Typography, Box, Button, Link } from "@mui/material";
import { useTheme } from '@mui/system';
import { ButtonSX } from "../components/customMui/CustomMui";

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

const NotLoggedInMessage = ({ open, message, onClose }) => {

    const rectangleStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        background: 'linear-gradient(#6D006B, #0D2430)',
        color: '#fff', // Puedes ajustar el color del texto según tus necesidades
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: open ? 'block' : 'none',
        zIndex: 9999, // Asegura que el rectángulo esté en la parte superior
      };    


  return (
    //     <Snackbar
    //       open={open}
    //       autoHideDuration={6000}
    //       onClose={onClose}
    //       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    //     >
    //       <Alert onClose={onClose} severity="info">
    //         {message}
    //       </Alert>
    //     </Snackbar>
    //   );

    <div style={rectangleStyle}>
    <div>{message}</div>
    <button onClick={onClose} style={{ marginTop: '10px' }} sx={{ ...ButtonSX }}>
    Cerrar
    </button>
    </div>
);

};

export default NotLoggedInMessage;