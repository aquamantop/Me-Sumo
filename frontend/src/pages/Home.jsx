import React from 'react'
import EventSearch from '../components/EventSearch/EventSearch'
import EventShowcase from '../components/eventShowcase/EventShowcase'
import { Grid } from '@mui/material'

function Home() {
  return (
    <div>Home
        {/*Header, Body, Footer*/}
        <Grid container>
            <EventSearch/>
            <EventShowcase/>
        </Grid>


        
    </div>
  )
}

export default Home