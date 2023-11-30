import {useState} from "react";
import BookingSearch from "../components/bookingSearch/bookingSearch";
import { Grid, Tabs, Tab } from "@mui/material";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ClubShowcase from "../components/clubShowcase/ClubShowcase";
import { TabsSX } from "../components/customMui/CustomMui";
import BookingShowcase from "../components/bookingShowcase/BookingShowcase";


function Disponibility() {
//   const [tabValue, setTabValue] = useState(0);
//   const [selectedFilters, setSelectedFilters] = useState({activityId: null, neighborhood: null, date: null});

//   const handleChangeTab = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleFilterChange = (filters) => {
//     console.log(filters)
//     setSelectedFilters(filters);
//   };


  return (
    <>
      
      <Grid
        container
        className="content"
        sx={{ height:"auto", mx: "auto", maxWidth: "1400px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'30px'}}
      >
        <Grid item xs={12} sm={3}>
          {/* <EventSearch onUpdateFilters={handleFilterChange} /> */}
            <BookingSearch />
        </Grid>
        <Grid item xs={12} sm={9} sx={{ overflowY: 'auto', scrollbarWidth: 'thin'}}> 
            <BookingShowcase />
        </Grid>
      </Grid>
      
    </>
  );
}

export default Disponibility;