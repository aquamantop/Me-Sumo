import EmailSharpIcon from "@mui/icons-material/EmailSharp"
import LockSharpIcon from "@mui/icons-material/LockSharp"
import { Link } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import CustomInput from "../components/customInput/CustomInput"
import { ButtonSX } from "../components/customMui/CustomMui"
import axiosInstance from "../hooks/api/axiosConfig"
import { useUserContext } from "../hooks/userContext"

export default function Login() {
  const navigate = useNavigate()
  const { loginUser } = useUserContext()

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
    const response = await new Promise((resolve) => {
      axiosInstance
        .post("/auth/login", userData)
        .then((response) => resolve(response))
        .catch((error) => setError(error))
    })

    if (!error) {
      loginUser(userData)
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
      <Box
        align="center"
        className="content"
        sx={{ mb: -1.1 }}
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
            icon={<EmailSharpIcon />}
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
            icon={<LockSharpIcon />}
          />

          <Button variant="contained" type="submit" sx={{ ...ButtonSX }}>
            Iniciar Sesión
          </Button>

          {error && (
            <Typography variant="body2" color="error.main">
              Por favor vuelva a intentarlo, sus credenciales son inválidas
            </Typography>
          )}
        </Stack>
        <Typography
          variant="body2"
          mt={"16px"}
          color="primary.main"
          sx={{
            letterSpacing: " 4.68px"
          }}
        >
          <Link href="/forgot-password" underline="none" color="secondary.main">
            Olvidé mi constraseña
          </Link>
        </Typography>
        <Typography
          variant="h5"
          mt={"36px"}
          color="primary.main"
          sx={{
            letterSpacing: " 4.68px"
          }}
        >
          Todavía no tenés usuario?{" "}
          <Link href="/register" underline="none" color="secondary.main">
            Registrate 
          </Link>
        </Typography>
      </Box>
    </>
  )
}
