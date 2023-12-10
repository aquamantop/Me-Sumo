import { ButtonSX } from '../components/customMui/CustomMui'
import { delay } from "../helpers/delay"
import { useForm } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import axiosInstance from "../hooks/api/axiosConfig";
import Box from "@mui/material/Box"
import BoxMessage from '../components/BoxMessage'
import Button from "@mui/material/Button"
import CustomInput from "../components/customInput/CustomInput"
import LockSharpIcon from "@mui/icons-material/LockSharp"
import Stack from "@mui/material/Stack"
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
  const [boxOpen, setBoxOpen] = useState(false);
  const [boxTitle, setBoxTitle] = useState('');
  const [boxMessage, setBoxMessage] = useState('');

  const okMessage = {
    title: '¡OK!',
    message: 'Cambio de constraseña exitoso'
  };

  const handleBoxClose = (_, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setBoxOpen(false);
  };

  const showMessage = (data) => {
      setBoxTitle(data.title)
      setBoxMessage(data.message);
      setBoxOpen(true);
  };

  const goLogin = async () => {
    await delay(2000)
    navigate("/login")
  }

  const onSubmit = handleSubmit(async (userData) => {

    try {
      const response = await axiosInstance.post(
        "/auth/reset-password",
        userData,
        {
          headers: {'Authorization': `Bearer ${token}` }
        }
      );
      if (response) {
        setError("");
        showMessage(okMessage)
        goLogin()
      }
    } catch (error) {
      setError("Algo salió mal. Por favor, volvé a intentarlo.");
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