import {useState} from "react";
import EventSearch from "../components/EventSearch/EventSearch";
import EventShowcase from "../components/eventShowcase/EventShowcase";
import { Grid, Tabs, Tab } from "@mui/material";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ClubShowcase from "../components/clubShowcase/ClubShowcase";
import { TabsSX } from "../components/customMui/CustomMui";


function Home() {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Header />
      <Grid
        container
        className="content"
        sx={{ mx: "auto", maxWidth: "1400px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'30px'}}
      >
        <Grid item xs={16} sm={5} sx={{ position: 'fixed', width: '20%', top: '150px', left: '20px', height: '100vh', overflowY: 'auto' }}>
          <EventSearch />
        </Grid>
        <Grid item xs={16} sm={2}>
        </Grid>
        <Grid item xs={16} sm={9} sx={{ height: '80vh', overflowY: 'auto' , scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '8px', // Ancho de la barra de desplazamiento
          height: '60px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: "#D6FF4E", // Color del pulgar (barra deslizante)
        },
        '&::-webkit-scrollbar-thumb:hover': {
        background: '#555', // Color del pulgar al pasar el ratón
        },
        '&::-webkit-scrollbar-track': {
          background: '#eee', // Color de la pista (fondo de la barra)
        },
      }}> 
          <Tabs 
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ marginLeft:'30px',
            '& .MuiTab-root': {
              textTransform: 'none',
              minWidth: 'auto',
              padding: '2px 10px',
              fontSize: '20px',
              fontWeight: 500,
              marginLeft: '10px',
              // backgroundColor: '#5DBE7A',
              borderRadius: '10px 10px 0 0',
              border: '1px solid #3FEBBD',
              '&.Mui-selected': { // Estilos para la pestaña seleccionada
                color: '#000', // Color del texto
                backgroundColor: '#3FEBBD', // Color de fondo
              },
            },
          }}
          value={tabValue} 
          onChange={handleChangeTab}>
            <Tab sx={{color:"#3FEBBD" }} label="Eventos"/>
            <Tab sx={{color:"#3FEBBD" }} label="Clubes"/>
          </Tabs>
          {tabValue === 0 && (
            <>
              <EventShowcase keyword="menos" />
              <EventShowcase keyword="más" />
            </>
          )}
          {tabValue === 1 && <ClubShowcase />}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Home;





// function Home() {
//   const [tabValue, setTabValue] = useState(0);

//   const handleChangeTab = (event, newValue) => {
//     setTabValue(newValue);
//   };
//   return (
//     <>
//       <Header />
//       <Grid
//         container
//         className="content"
//         sx={{ mx: "auto", maxWidth: "1200px" }}
//       >
//         <Grid item xs={12} sm={3}>
//           <EventSearch />
//         </Grid>
//         <Grid item xs={12} sm={9}>
//           <Tabs 
//           textColor="secondary"
//           indicatorColor="secondary"
//           sx={{ml:4}} 
//           value={tabValue} 
//           onChange={handleChangeTab}>
//             <Tab sx={{color:"#62E8FF" }} label="Eventos"/>
//             <Tab sx={{color:"#62E8FF" }} label="Clubes"/>
//           </Tabs>
//           {tabValue === 0 && (
//             <>
//               <EventShowcase keyword="menos" />
//               <EventShowcase keyword="más" />
//             </>
//           )}
//           {tabValue === 1 && <ClubShowcase />}
//         </Grid>
//       </Grid>
//       <Footer />
//     </>
//   );
// }

// export default Home;

