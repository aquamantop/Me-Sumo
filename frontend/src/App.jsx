import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Club from './pages/Club'
import { ThemeProvider, createTheme } from '@mui/material'


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#C3FD74"
      },
      secondary: {
        main: "#62E8FF"
      },
      info: {
        main: "#FCBA7D"
      },
      background: {
        paper: "#262526",

      }
    }
  })

  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/club/:id' element={<Club/>}/>
      </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
