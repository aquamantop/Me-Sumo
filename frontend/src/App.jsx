import { ThemeProvider, createTheme } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Route, Routes } from 'react-router'
import './App.css'
import Club from './pages/Club'
import Home from './pages/Home'
import Login from './pages/Login'
import LoginSuccess from './pages/LoginSuccess'
import EventCreate from './pages/EventCreate'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#C3FD74', //verde
      },
      secondary: {
        main: '#62E8FF', //azul
      },
      info: {
        main: '#FCBA7D',
      },
      background: {
        paper: '#03081B',
      },
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/club/:id' element={<Club />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login-success' element={<LoginSuccess />} />
            <Route path='/new-event' element={<EventCreate/>}/>
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}

export default App
