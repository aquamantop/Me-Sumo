import PersonIcon from '@mui/icons-material/Person'
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp'
import EmailSharpIcon from '@mui/icons-material/EmailSharp'
import LockSharpIcon from '@mui/icons-material/LockSharp'
import { Link } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../components/customInput/CustomInput'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import axios from 'axios'
import Swal from 'sweetalert2'
import axiosInstance from "../hooks/api/axiosConfig";
import { ButtonSX } from '../components/customMui/CustomMui'

export default function Register() {
  const navigate = useNavigate()

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [error, setError] = useState('')

  const onSubmit = handleSubmit(async (userData) => {

    const response = await new Promise((resolve) => {
        // axios({
        //   method: "POST",
        //   url: 'http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/auth/register',
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   data: userData,
        // })
        axiosInstance.post("/auth/register", userData)
        .then((response) => resolve(response))
        .catch((error) => resolve(error));
    });

    if (!error) {
      Swal.fire({
        title: "Registro exitoso!",
        icon: "success",
        timer: 1500
      });
      navigate('/login')
    } else {
      setError(error)
    }
  })

  return (
    <>
      
      <Box
        backgroundColor='background.paper'
        align='center'
        sx={{ mb: 10, mx: 'auto', maxWidth: '1200px' }}
      >
        <Typography
          fontSize={50}
          color='primary.main'
          sx={{
            letterSpacing: 13,
          }}
        >
          ¡Hola!
        </Typography>
        <Typography
          fontSize={36}
          color='primary.main'
          sx={{
            fontWeight: 'regular',
            letterSpacing: ' 4.68px',
            marginBottom: '36px',
          }}
        >
          ¡Qué alegría que te unas a nuestra comunidad!
        </Typography>
        <Stack
          sx={{ margin: 'auto', px: 5 }}
          component='form'
          maxWidth={500}
          spacing={2}
          m={2}
          onSubmit={onSubmit}
        >
          <CustomInput
            name='firstName'
            control={control}
            placeholder='Nombre *'
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
            type=''
            rules={{
              required: {
                value: true,
                message: 'El nombre es requerido',
              },
            }}
            icon={<PersonIcon />}
          />
          <CustomInput
            name='lastName'
            control={control}
            placeholder='Apellido *'
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
            type=''
            rules={{
              required: {
                value: true,
                message: 'El apellido es requerido',
              },
            }}
            icon={<PersonIcon />}
          />
          <CustomInput
            name='userName'
            control={control}
            placeholder='Apodo *'
            error={!!errors.userName}
            helperText={errors?.userName?.message}
            type=''
            rules={{
              required: {
                value: true,
                message: 'El apodo es requerido',
              },
            }}
            icon={<EmojiEmotionsSharpIcon />}
          />
          <CustomInput
            name='email'
            control={control}
            placeholder='Correo Electrónico *'
            error={!!errors.email}
            helperText={errors?.email?.message}
            type='email'
            rules={{
              required: {
                value: true,
                message: 'El correo es requerido',
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Correo no válido',
              },
            }}
            icon={<EmailSharpIcon />}
          />

          <CustomInput
            name='password'
            control={control}
            type='password'
            placeholder='Contraseña *'
            error={!!errors.password}
            helperText={errors?.password?.message}
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
            Registrarme
          </Button>

          {error && (
            <Typography variant='body2' color='error.main'>
              { error.message }
            </Typography>
          )}
        </Stack>
        <Typography
          style={{ textWrap: 'balance' }}
          variant='h5'
          mt={'36px'}
          color='primary.main'
          sx={{
            letterSpacing: ' 4.68px',
          }}
        >
          ¿Ya tienes una cuenta?{' '}
          <Link href='/login' underline='none' color='secondary.main'>
            Iniciar sesión
          </Link>
        </Typography>
      </Box>
      
    </>
  )
}
