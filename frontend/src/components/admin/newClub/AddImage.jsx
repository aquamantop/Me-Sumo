import React, { useState, useRef  } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  TextField,
  Grid,
  Autocomplete,
  Button,
  InputAdornment,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  Input,
} from "@mui/material";
import { ButtonSX } from "../../customMui/CustomMui";
import { uploadFile } from 'react-s3';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

const REGION = 'us-east-1'
const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESS_KEY;
const S3_BUCKET = 'me-sumo-img'

console.log("REGION", REGION);
console.log("ACCES", ACCESS_KEY_ID);
console.log("SECRET", SECRET_ACCESS_KEY);
console.log("BUCKET", S3_BUCKET);

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY_ID, 
    secretAccessKey: SECRET_ACCESS_KEY 
  };
  

const AddImages = ( {onImageSelected} ) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert('Selecciona un archivo antes de cargarlo.');
        return;
      }
  
        
      const data = await uploadFile(selectedFile, config);
      setFileUrl(data.location);
  
      onImageSelected(data.location);

      alert('Archivo cargado con éxito en el bucket: ' + config.bucketName);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      alert('Error al cargar el archivo');
    }
  };
  
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Container>
          <Typography variant="h6" color="secondary.main">
            Imagen del Club
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={12} md={6} m={2}>
        <Container>
          <button onClick={handleButtonClick} style={{padding:'8px', backgroundColor:'#C3FD74', border:'none', borderRadius:'5px'}} >Seleccionar archivo</button >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {selectedFile && (
            <Typography variant="body2" sx={{ color: 'white' }}>
              Archivo seleccionado: {selectedFile.name}
            </Typography>
          )}
        </Container>
      </Grid>
      <Grid item xs={12} md={6}>
        <Container>
          <Button fullWidth color="primary" onClick={handleUpload} sx={{...ButtonSX}}>
            Subir Archivo
          </Button>
        </Container>
      </Grid>
    </Grid>
  );


};
  
export default AddImages;