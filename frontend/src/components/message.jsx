import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Card, CardContent, CardMedia, Typography, Box, Button, Link } from "@mui/material";
import { useTheme } from '@mui/system';
import { ButtonSX } from "../components/customMui/CustomMui";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

const NotLoggedInMessage = ({ open, message, onClose }) => {

    // const rectangleStyle = {
    //     position: 'fixed',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     padding: '20px',
    //     background: 'linear-gradient(#6D006B, #0D2430)',
    //     color: '#fff',
    //     borderRadius: '8px',
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //     display: open ? 'block' : 'none',
    //     zIndex: 9999,
    // };    


//  return 
//   (
//     <div style={rectangleStyle}>
//     <div>{message}</div>
//     <button onClick={onClose} style={{ marginTop: '10px' }} sx={{ ...ButtonSX }}>
//     Cerrar
//     </button>
//     </div>
//   );

return (
    <Dialog open={open} onClose={onClose} maxWidth='lg' >
      <DialogContent
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height:'180px',
          background: 'linear-gradient(#6D006B, #0D2430)',
          color: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {message.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            <Typography variant="h5" >
                {line}
            </Typography>
            <br />
        </React.Fragment>
        ))}
        <Button onClick={onClose} sx={{ ...ButtonSX }} fullWidth>
          ¡OK!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

//};

export default NotLoggedInMessage;