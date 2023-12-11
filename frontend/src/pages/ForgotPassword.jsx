import EmailSharpIcon from "@mui/icons-material/EmailSharp"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useForm } from "react-hook-form"
import CustomInput from "../components/customInput/CustomInput"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../hooks/api/axiosConfig";
import { ButtonSX } from '../components/customMui/CustomMui'

export default function ForgotPassword() {

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
    }
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)


  const onSubmit = handleSubmit(async (userData) => {  
    const response = await new Promise((resolve) => {
      axiosInstance.post("/auth/forgot-password", userData)
        .then((response) => resolve(response))
        .catch((error) => setError(error))
    })
    if (response) {
      setError("")
      setSuccess(true)
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
          Restablecer Contraseña
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
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
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

          <Button
            variant='contained'
            type='submit'
            sx={{...ButtonSX}}
          >
            Enviar mail
          </Button>
          
          {success && (
            <Typography variant="body2" color="success.main">
              Listo! Revisa tu casilla de correo.
            </Typography>
          )}

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