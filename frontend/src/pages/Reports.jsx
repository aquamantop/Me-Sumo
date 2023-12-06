import React, { useRef, useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useUserContext } from '../hooks/userContext';
import axiosInstance from '../hooks/api/axiosConfig';

const Reports = () => {
  const { user } = useUserContext();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/search-email?email=${user.email}`);
        setUserInfo(response.data);
        
        if (response.data.role !== 'ROLE_ADMIN'){
            alert("No tiene permiso para acceder a esta página.");
            window.location.href = "/";
        }
        
      } catch (error) {
        setError(error);
      }
    };

    if (user) {
      fetchData();
    } else {
        alert("No tiene permiso para acceder a esta página.");
            window.location.href = "/";
    }
  }, [user]);

  const handleDownloadPDF = () => {
    // Accede al objeto contentWindow del iframe y llama a la función exportPDF
    const powerBiIframe = iframeRef.current;
    if (powerBiIframe) {
      const contentWindow = powerBiIframe.contentWindow;
      if (contentWindow && contentWindow.exportPDF) {
        contentWindow.exportPDF();
      } else {
        console.error('La función exportPDF no está disponible en el iframe.');
      }
    }
  };

  return (
    <Container>
      {userInfo?.role === 'ROLE_ADMIN' ? (
        <>
        <Typography variant="h5" align="center">Reports</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <iframe
            title="MeSumoDash"
            width="100%"
            height="1000px"
            src="https://app.powerbi.com/reportEmbed?reportId=2576de11-1a23-4328-966c-01ef836455d8&autoAuth=true&ctid=881738ec-4d01-419a-a9da-6c8825932861"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <Button variant="contained" color="primary" onClick={handleDownloadPDF} style={{ marginTop: '10px' }}>
            Descargar PDF
          </Button>
        </div>
      </> ): <></>}
    </Container>
  );
};

export default Reports;