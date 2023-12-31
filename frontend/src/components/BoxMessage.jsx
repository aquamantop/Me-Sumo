import React from 'react';
import { Typography, Button } from "@mui/material";
import { ButtonSX } from "./customMui/CustomMui";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


const BoxMessage = ({ open, title = "", message, onClose }) => {

return (
    <Dialog open={open} onClose={onClose} width='300px' >
      <DialogContent
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(#6D006B, #0D2430)',
          color: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <React.Fragment>
            <Typography variant="h5" >
                { title }
            </Typography>
            <Typography variant="h6" >
                { message }
            </Typography>
            <br />
        </React.Fragment>
        <Button onClick={onClose} sx={{ ...ButtonSX }} fullWidth>
          ¡OK!
        </Button>
      </DialogContent>
    </Dialog>
  );
};


export default BoxMessage;