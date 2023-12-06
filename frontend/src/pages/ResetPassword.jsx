import { ButtonSX } from '../components/customMui/CustomMui'
import { useForm } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import axiosInstance from "../hooks/api/axiosConfig";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CustomInput from "../components/customInput/CustomInput"
import LockSharpIcon from "@mui/icons-material/LockSharp"
import Stack from "@mui/material/Stack"
import Swal from "sweetalert2"
import Typography from "@mui/material/Typography"

export default function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
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

  const handleInputChange = () => {
    setError("");
  };

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
            name='password'
            control={control}
            type='password'
            placeholder='Contraseña *'
            error={!!errors.password}
            helperText={errors?.password?.message}
            onChange={handleInputChange}
            rules={{
              required: {
                value: true,
                message: 'La contraseña es requerida',
              },
              pattern: {
                value: /^.{6,}$/,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            }}
            icon={<LockSharpIcon />}
          />

          <CustomInput
            name='confirmPassword'
            control={control}
            type='password'
            placeholder='Repetir Contraseña *'
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
            onChange={handleInputChange}
            rules={{
              required: {
                value: true,
                message: 'La contraseña es requerida',
              },
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = watch()
                  return password === value || 'Las contraseñas no coinciden'
                },
              },
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
              { error }
            </Typography>
          )}
        </Stack>
      </Box>
    </>
  )
}