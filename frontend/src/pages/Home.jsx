import React from "react";
import EventSearch from "../components/EventSearch/EventSearch";
import EventShowcase from "../components/eventShowcase/EventShowcase";
import { Grid } from "@mui/material";

function Home() {
    return (
        <div>
            Home
            {/*Header with login buttons*/}
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <EventSearch />
                </Grid>
                <Grid item xs={12} sm={9} >
                    <EventShowcase keyword="menos" />
                    <EventShowcase keyword="más" />
                </Grid>
                
            </Grid>
            {/*Footer*/}
        </div>
    );
}

export default Home;
