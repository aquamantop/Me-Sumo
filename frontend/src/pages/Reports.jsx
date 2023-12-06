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
            src="https://app.powerbi.com/reportEmbed?reportId=fbf5be60-e863-48ee-b268-00d15edaabf8&autoAuth=true&ctid=0eee030f-7df6-4a92-9658-9f61116b4800"
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
