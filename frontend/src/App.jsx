import "./App.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BookingProvider } from "./hooks/bookingContext";
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Route, Routes } from 'react-router'
import { ThemeProvider, createTheme } from '@mui/material'
import { UserProvider } from "./hooks/userContext";
import Event from "./pages/Event";
import Bookings from './pages/Bookings'
import Club from "./pages/Club";
import Disponibility from "./pages/Disponibility";
import EventCreate from "./pages/EventCreate";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NotFound from './pages/NotFound'
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import ResetPassword from "./pages/ResetPassword";
import Slots from "./pages/Slots";
import CourtCreate from "./pages/CourtCreate"
import ChangePassword from "./pages/ChangePassword";



function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#C3FD74",
      },
      secondary: {
        main: "#3FEBBD",
      },
      warning: {
        main: "#ed6c02",
      },
      background: {
        paper: "#03081B",
        default: "#03081B",
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          label: {
            color: "white",
          },
          root: {
            backgroundColor: "rgb(255,255,255, 0.1)",
            "& fieldset": {
              borderColor: "white",
            },
            "& label": {
              color: "white",
            },
            input: {
              '&:-webkit-autofill': {
                WebkitBoxShadow: 'none',
                WebkitTextFillColor: '#fff',
              },
            },
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserProvider>
            <BookingProvider>
              <Layout>
                <div class="content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/club/:id" element={<Club />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/event/:id" element={<Event />} />
                    <Route path="/new-event" element={<EventCreate />} />
                    <Route path="/disponibility" element={<Disponibility />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/new-slot/:id" element={<Slots />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path='/booking/:id' element={<Bookings />} />
                    <Route path="/new-court/" element={<CourtCreate/>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </Layout>
            </BookingProvider>
          </UserProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
