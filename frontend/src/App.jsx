import { ThemeProvider, createTheme } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Route, Routes } from 'react-router'
import './App.css'
import Club from './pages/Club'
import Home from './pages/Home'
import Login from './pages/Login'
import LoginSuccess from './pages/LoginSuccess'
import Register from './pages/Register'
import EventCreate from './pages/EventCreate'
import Booking from './pages/Event'
import { UserProvider } from './hooks/userContext'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Profile from './pages/Profile'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#C3FD74',
      },
      secondary: {
        main: '#3FEBBD',
      },
      warning: {
        main: '#ed6c02',
      },
      background: {
        paper: '#03081B',
        default: '#03081B',
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          label: {
            color: 'white'
          },
          root: {
            backgroundColor: "rgb(255,255,255, 0.1)", 
            '& fieldset': {
                borderColor: 'white',
            },
            '& label': {
              color: 'white'
            }
          }
        }
      },
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserProvider>
            <Header/>
            <div class='content'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/club/:id' element={<Club />} />
                <Route path='/login' element={<Login />} />
                <Route path='/login-success' element={<LoginSuccess />} />
                <Route path='/register' element={<Register />} />
                <Route path='/event/:id' element={<Booking />} />
                <Route path='/new-event' element={<EventCreate/>}/>
                <Route path='/profile' element={<Profile/>}/>
              </Routes>
            </div>
            <Footer/>
          </UserProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}

export default App
