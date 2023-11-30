import LockSharpIcon from "@mui/icons-material/LockSharp"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useForm } from "react-hook-form"
import CustomInput from "../components/customInput/CustomInput"
import { useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import { ButtonSX } from '../components/customMui/CustomMui'
import axiosInstance from "../hooks/api/axiosConfig";

export default function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const [error, setError] = useState("")

  const onSubmit = handleSubmit(async (userData) => {

    const response = await new Promise((resolve) => {
      axiosInstance.post("/auth/reset-password", userData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => resolve(response))
      .catch((error) => setError(error))
    })

    if (!error) {
      setError("")
      Swal.fire({
        title: "Cambio de contraseña exitoso!",
        icon: "success",
        timer: 1500
      })
      navigate("/login")
    } else {
      setError("Algo salió mal!")
    }
  })

  return (
    <>
      
      <Box
        backgroundColor="background.paper"
        align="center"
        className="content"
      >
        <Typography
          variant="h4"
          color="primary.main"
          sx={{
            letterSpacing: 13
          }}
        >
          Nueva Contraseña
        </Typography>
        <Typography
          variant="h6"
          color="primary.main"
          sx={{
            fontWeight: "regular",
            letterSpacing: " 4.68px",
            marginBottom: "36px"
          }}
        >
          Ingresa tu nueva contraseña para completar el restablecimiento.
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
            name="password"
            control={control}
            placeholder="Nueva contraseña"
            error={!!errors.password}
            helperText={errors?.password?.message}
            type="password"
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

          <CustomInput
            name="confirmPassword"
            control={control}
            type="password"
            placeholder="Confirmar contraseña"
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
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

          <Button
            variant='contained'
            type='submit'
            sx={{...ButtonSX}}
          >
            Guardar
          </Button>

          {error && (
            <Typography variant="body2" color="error.main">
              Algo salió mal. Por favor, vuelva a intentarlo
            </Typography>
          )}
        </Stack>
      </Box>
    </>
  )
}