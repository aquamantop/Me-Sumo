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
import { BookingProvider } from './hooks/bookingContext'
import Profile from './pages/Profile'
import Slots from './pages/Slots'
import Bookings from './pages/Bookings'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Reports from './pages/Reports'
import Disponibility from './pages/Disponibility'
import Layout from './pages/Layout'


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
            <BookingProvider>  
            <Layout>
            <div class='content'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/club/:id' element={<Club />} />
                <Route path='/login' element={<Login />} />
                <Route path='/login-success' element={<LoginSuccess />} />
                <Route path='/register' element={<Register />} />
                <Route path='/event/:id' element={<Booking />} />
                <Route path='/new-event' element={<EventCreate/>}/>
                <Route path='/disponibility' element={<Disponibility/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/new-slot/:id' element={<Slots />}/>
                <Route path='/bookings/:id' element={<Bookings/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
                <Route path='/reports' element={<Reports/>}/>
              </Routes>
            </div>
            </Layout>
          </BookingProvider>
          </UserProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}

export default App
