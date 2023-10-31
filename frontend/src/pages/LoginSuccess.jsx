import { Box, Link, Typography } from '@mui/material'

export default function LoginSuccess() {
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        backgroundColor='background.paper'
        align='center'
        flex={1}
        sx={{ height: '100vh' }}
      >
        <Typography
          fontSize={36}
          color='primary.main'
          sx={{
            letterSpacing: 3,
          }}
        >
          ¡Registro exitoso! Estás a un paso de marcar goles en nuestras
          canchas.
        </Typography>
        <Link
          href='#'
          fontFamily={'sans-serif'}
          underline='none'
          fontSize={36}
          color='secondary.main'
          sx={{
            fontWeight: 'regular',
            letterSpacing: ' 4.68px',
            marginBottom: '36px',
          }}
        >
          ¡Reservá ahora!
        </Link>
      </Box>
    </>
  )
}
