import {useState} from "react";
import EventSearch from "../components/EventSearch/EventSearch";
import EventShowcase from "../components/eventShowcase/EventShowcase";
import { Grid, Tabs, Tab } from "@mui/material";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ClubShowcase from "../components/clubShowcase/ClubShowcase";


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
        sx={{ mx: "auto", maxWidth: "1200px" }}
      >
        <Grid item xs={12} sm={3}>
          <EventSearch />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Tabs 
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ml:4}} 
          value={tabValue} 
          onChange={handleChangeTab}>
            <Tab sx={{color:"#62E8FF" }} label="Eventos"/>
            <Tab sx={{color:"#62E8FF" }} label="Clubes"/>
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
