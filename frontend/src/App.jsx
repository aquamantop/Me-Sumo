import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Club from './pages/Club'
import { ThemeProvider, createTheme } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
        paper: "#03081B",

      }
    }
  })

  return (
    <>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/club/:id' element={<Club/>}/>
      </Routes>
      </LocalizationProvider>
    </ThemeProvider>
    </>
  )
}

export default App
