import { ButtonSX } from "../components/customMui/CustomMui"
import { delay } from "../helpers/delay";
import { Link } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUserContext } from "../hooks/userContext"
import axiosInstance from "../hooks/api/axiosConfig"
import Box from "@mui/material/Box"
import BoxMessage from '../components/BoxMessage'
import Button from "@mui/material/Button"
import CustomInput from "../components/customInput/CustomInput"
import EmailSharpIcon from "@mui/icons-material/EmailSharp"
import LockSharpIcon from "@mui/icons-material/LockSharp"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

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
  const [boxOpen, setBoxOpen] = useState(false);
  const [boxTitle, setBoxTitle] = useState('');
  const [boxMessage, setBoxMessage] = useState('');
  

  const okMessage = {
      title: '¡OK!',
      message: 'Ingreso exitoso'
  };
  
  const handleBoxClose = (_, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setBoxOpen(false);
      setIsParticipant(true);
  };

  
  const showMessage = (data) => {
      setBoxTitle(data.title)
      setBoxMessage(data.message);
      setBoxOpen(true);
  };

  const goHome = async () => {
    await delay(2000)
    navigate("/")
  }

  const onSubmit = handleSubmit(async (userData) => {
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      if (response) {
        loginUser(userData);
        setError("");
        showMessage(okMessage)
        goHome()
      }
    } catch (error) {
      setError("Credenciales inválidas");
    }
  });

  const handleInputChange = () => {
    setError("");
  };

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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
              { error }
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
        <BoxMessage
            open={boxOpen}
            title={boxTitle}
            message={boxMessage}
            onClose={handleBoxClose}
        />
      </Box>
    </>
  )
}
