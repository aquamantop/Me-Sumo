import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CustomLoader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default CustomLoader;