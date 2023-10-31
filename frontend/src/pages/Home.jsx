import React from "react";
import EventSearch from "../components/EventSearch/EventSearch";
import EventShowcase from "../components/eventShowcase/EventShowcase";
import { Grid, CssBaseline, Container } from "@mui/material";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function Home() {
    return (
        <>
                <Header/>
                <Grid container sx={{mt:15, mb:10, mx:'auto', maxWidth:'1200px'}}>
                    <Grid item xs={12} sm={3}>
                        <EventSearch />
                    </Grid>
                    <Grid item xs={12} sm={9} >
                        <EventShowcase keyword="menos" />
                        <EventShowcase keyword="más" />
                    </Grid>
                </Grid>
                <Footer/>
        </>
    );
}

export default Home;
