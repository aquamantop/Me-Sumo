import React from "react";
import EventSearch from "../components/EventSearch/EventSearch";
import EventShowcase from "../components/eventShowcase/EventShowcase";
import { Grid } from "@mui/material";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    activityId: null,
    neighborhood: null,
    date: null,
  });

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (filters) => {
    console.log(filters);
    setSelectedFilters(filters);
  };

  return (
    <>
      <Header />
      <Grid
        container
        className='content'
        sx={{ mx: "auto", maxWidth: "1200px" }}
      >
        <Grid item xs={12} sm={3}>
          <EventSearch onUpdateFilters={handleFilterChange} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          sx={{ overflowY: "auto", scrollbarWidth: "thin" }}
        >
          <Tabs
            textColor='secondary'
            indicatorColor='secondary'
            sx={{ ...TabsSX }}
            value={tabValue}
            onChange={handleChangeTab}
          >
            <Tab sx={{ color: "#3FEBBD" }} label='Eventos' />
            <Tab sx={{ color: "#3FEBBD" }} label='Clubes' />
          </Tabs>
          {tabValue === 0 && (
            <>
              <EventShowcase keyword='Próximos' filters={selectedFilters} />
              <EventShowcase keyword='Todos' filters={selectedFilters} />
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
