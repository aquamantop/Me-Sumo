import PersonIcon from '@mui/icons-material/Person'
import { Link } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/customInput/CustomInput'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [error, setError] = useState('')

  const onSubmit = handleSubmit(async (userData) => {
    console.log(userData)
    await signin(userData)
  })

  const signin = async (userData) => {
    const { email, password } = userData

    if (email === 'test@gmail.com' && password === '123456') {
      setError('')
      console.log('Credenciales válidas, redireccionando')
      navigate('/login-success')
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <>
      <Box
        backgroundColor='background.paper'
        align='center'
        sx={{ height: '100vh' }}
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
          ¿Qué actividad vas a hacer hoy?
        </Typography>
        <Stack
          sx={{ margin: 'auto' }}
          component='form'
          width={500}
          spacing={2}
          m={2}
          onSubmit={onSubmit}
        >
          <CustomInput
            name='email'
            control={control}
            placeholder='Email'
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
            icon={<PersonIcon />}
          />

          <CustomInput
            name='password'
            control={control}
            type='password'
            placeholder='Contraseña'
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
            icon={<PersonIcon />}
          />

          <Button
            variant='contained'
            type='submit'
            sx={{
              backgroundColor: 'secondary.main',
              borderRadius: '3px',
              color: 'black',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'white',
              },
              height: '40px',
              letterSpacing: '2.86px',
            }}
          >
            Iniciar Sesión
          </Button>

          {error && (
            <Typography variant='body2' color='error.main'>
              Por favor vuelva a intentarlo, sus credenciales son inválidas
            </Typography>
          )}
        </Stack>
        <Typography
          variant='h5'
          mt={'36px'}
          color='primary.main'
          sx={{
            letterSpacing: ' 4.68px',
          }}
        >
          Todavía no tenés usuario?{' '}
          <Link href='#' underline='none' color='secondary.main'>
            Registrate ;)
          </Link>
        </Typography>
      </Box>
    </>
  )
}
