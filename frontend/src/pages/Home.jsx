import React, { useState } from "react";
import EventSearch from "../components/eventSearch/EventSearch.jsx";
import EventShowcase from "../components/eventShowcase/EventShowcase";
import { Grid, Tabs, Tab } from "@mui/material";
import ClubShowcase from "../components/clubShowcase/ClubShowcase";
import { TabsSX } from "../components/customMui/CustomMui";


function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({ activityId: null, neighborhood: null, date: null });

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  return (
    <>
        <Grid
          container
          className="content"
          
          sx={{ height: "auto"
            , mx: "auto"
            , maxWidth: "1400px"
            , display: 'flex'
            , flexDirection: 'row'
            , justifyContent: 'space-between'
            , marginTop: '30px'
            // ,backgroundImage: `url(${sports})`, backgroundSize: 'cover', backgroundPosition: 'center' 
          }}
          
        >
          <Grid item xs={12} sm={3}>
            <EventSearch onUpdateFilters={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={9} sx={{ overflowY: 'auto', scrollbarWidth: 'thin' }}>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              sx={{ ...TabsSX }}
              value={tabValue}
              onChange={handleChangeTab}
            >
              <Tab sx={{ color: "#3FEBBD" }} label="Eventos" />
              <Tab sx={{ color: "#3FEBBD" }} label="Clubes" />
            </Tabs>
            {tabValue === 0 && (
              <>
                <EventShowcase keyword="Próximos" filters={selectedFilters} />
                <EventShowcase keyword="Todos" filters={selectedFilters} />
              </>
            )}
            {tabValue === 1 && <ClubShowcase />}
          </Grid>
        </Grid>    
    </>
  );
}

export default Home;
