import PersonIcon from "@mui/icons-material/Person"
import { Link } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useForm } from "react-hook-form"
import CustomInput from "../components/customInput/CustomInput"
import { useNavigate } from "react-router-dom"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import axios from "axios"
import Swal from "sweetalert2"
import { ButtonSX } from '../components/customMui/CustomMui'
import { useUserContext } from '../hooks/userContext'

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUserContext();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const [error, setError] = useState("")

  const onSubmit = handleSubmit(async (userData) => {
    console.log(userData)
      const response = await new Promise((resolve) => {
        axios({
          method: "POST",
          url: 'http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/auth/login',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: userData,
        })
          .then((response) => resolve(response))
          .catch((error) => setError(error));
      });
    
    console.log(response)

    if (!error) {
      loginUser(userData);
      setError("")
      Swal.fire({
        title: "Ingreso exitoso!",
        icon: "success",
        timer: 1500
      })
      navigate("/login-success")
    } else {
      setError("Credenciales inválidas")
    }
  })

  return (
    <>
      <Header />
      <Box
        backgroundColor="background.paper"
        align="center"
        className="content"
      >
        <Typography
          fontSize={50}
          color="primary.main"
          sx={{
            letterSpacing: 13
          }}
        >
          ¡Hola!
        </Typography>
        <Typography
          fontSize={36}
          color="primary.main"
          sx={{
            fontWeight: "regular",
            letterSpacing: " 4.68px",
            marginBottom: "36px"
          }}
        >
          ¿Qué actividad vas a hacer hoy?
        </Typography>
        <Stack
          sx={{ margin: "auto", px: 5 }}
          component="form"
          maxWidth={500}
          spacing={2}
          m={2}
          onSubmit={onSubmit}
        >
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            error={!!errors.email}
            helperText={errors?.email?.message}
            type="email"
            rules={{
              required: {
                value: true,
                message: "El correo es requerido"
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Correo no válido"
              }
            }}
            icon={<PersonIcon />}
          />

          <CustomInput
            name="password"
            control={control}
            type="password"
            placeholder="Contraseña"
            error={!!errors.password}
            helperText={errors?.password?.message}
            rules={{
              required: {
                value: true,
                message: "La contraseña es requerida"
              },
              pattern: {
                value: /^.{6,}$/,
                message: "La contraseña debe tener al menos 6 caracteres"
              }
            }}
            icon={<PersonIcon />}
          />

          <Button
            variant='contained'
            type='submit'
            sx={{...ButtonSX}}
          >
            Iniciar Sesión
          </Button>

          {error && (
            <Typography variant="body2" color="error.main">
              Por favor vuelva a intentarlo, sus credenciales son inválidas
            </Typography>
          )}
        </Stack>
        <Typography
          variant="h5"
          mt={"36px"}
          color="primary.main"
          sx={{
            letterSpacing: " 4.68px"
          }}
        >
          Todavía no tenés usuario?{' '}
          <Link href='/register' underline='none' color='secondary.main'>
            Registrate ;
          </Link>
        </Typography>
      </Box>
      <Footer />
    </>
  )
}
