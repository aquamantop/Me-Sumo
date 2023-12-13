import { ButtonSX } from '../components/customMui/CustomMui'
import { delay } from "../helpers/delay"
import { useForm } from "react-hook-form"
import { useUserContext } from "../hooks/userContext";
import { useState } from "react"
import axiosInstance from "../hooks/api/axiosConfig";
import Box from "@mui/material/Box"
import BoxMessage from '../components/BoxMessage'
import Button from "@mui/material/Button"
import CustomInput from "../components/customInput/CustomInput"
import LockSharpIcon from "@mui/icons-material/LockSharp"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export default function ChangePassword() {
  const { user, logoutUser } = useUserContext()

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
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

  const logout = async () => {
    await delay(2000)
    logoutUser();
  }

  const onSubmit = handleSubmit(async (userData) => {
    try {
      const body = {
        email: user.email,
        oldPassword: userData.oldPassword,
        newPassword: userData.newPassword,
        confirmPassword: userData.confirmPassword
      }
      const response = await axiosInstance.put(
        "/user/change-password",
        body,
        {
          headers: {'Authorization': `Bearer ${user.token}` }
        }
      );
      if (response) {
        setError("");
        showMessage(okMessage)
        logout()
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
          Ingresa los datos para completar el cambio de tu contraseña.
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
            name='oldPassword'
            control={control}
            type='password'
            placeholder='Contraseña actual *'
            error={!!errors.oldPassword}
            helperText={errors?.oldPassword?.message}
            onChange={handleInputChange}
            rules={{
              required: {
                value: true,
                message: 'La contraseña es requerida',
              },
              pattern: {
                value: /^.{6,18}$/,
                message: 'La contraseña debe tener estar entre 6 y 18 caracteres',
              },
            }}
            icon={<LockSharpIcon />}
          />

          <CustomInput
            name='newPassword'
            control={control}
            type='password'
            placeholder='Nueva contraseña *'
            error={!!errors.newPassword}
            helperText={errors?.newPassword?.message}
            onChange={handleInputChange}
            rules={{
              required: {
                value: true,
                message: 'La contraseña es requerida',
              },
              pattern: {
                value: /^.{6,18}$/,
                message: 'La contraseña debe tener estar entre 6 y 18 caracteres',
              },
            }}
            icon={<LockSharpIcon />}
          />

          <CustomInput
            name='confirmPassword'
            control={control}
            type='password'
            placeholder='Repetir Nueva Contraseña *'
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
                  const { newPassword } = watch()
                  return newPassword === value || 'Las contraseñas no coinciden'
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
