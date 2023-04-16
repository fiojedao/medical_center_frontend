// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../hooks/useSubmitForm'
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../context/UserContext'

export function Login () {
  const navigate = useNavigate()
  const {saveUser} =useContext(UserContext)
  // Esquema de validación
  const loginSchema = yup.object({
    useremail: yup.string()
      .required('El email es requerido')
      .email('Formato email'),
    password: yup.string()
      .required('El password es requerido')
  })
  const { control, handleSubmit, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      useremail: '',
      password: ''
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema)
  })

  // Valores de formulario
  const [formData, setData] = useState(null)
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({endpoint: 'userauth/login', action: 'POST', formData, start});
  // Accion submit

  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      console.log(DataForm)
      setData(DataForm)
      // Indicar que se puede realizar la solicitud al API
      setStart(true)
    } catch (e) {
      // handle your error
    }
  }
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la pelicula que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(() => {
    if (responseData != null) {
      // Guardar token
      saveUser(responseData)
      return navigate('/')
    }
  }, [responseData])
  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='useremail'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='useremail'
                    label='Email'
                    error={Boolean(errors.useremail)}
                    helperText={errors.useremail ? errors.useremail.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='password'
                    label='Password'
                    type='password'
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Login</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
