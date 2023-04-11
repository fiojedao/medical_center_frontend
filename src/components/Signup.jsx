// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { useEffect, useState } from 'react'
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
import toast from 'react-hot-toast'

export function Signup () {
  const navigate = useNavigate()
  // Esquema de validación
  const loginSchema = yup.object({
     id: yup.string()
      .required('El numero de identificacion es requerido'),
      name: yup.string()
      .required('El nombre es requerido'),
      lastname_one: yup.string()
      .required('El primer apellido es requerido'),
      lasnamet_two: yup.string()
      .required('El segundo apellido es requerido'),
      genre: yup.string()
      .required('El genero es requerido'),
      date_of_birth: yup.string()
      .required('La fecha de nacimiento es requerida'),
      contact: yup.string()
      .required('El numero de contacto es requerido'),
      emergency_contact: yup.string()
      .required('El numero contacto en caso de emergencia es requerido'),
      blood_type: yup.string()
      .required('El tipo de sangre requerido'),

  })
  const { control, handleSubmit, setValue, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      id: '',
      name: '',
      lastname_one: '',
      lasnamet_two: '',
      genre: '',
      address: '',
      date_of_birth: '',
      contact: '',
      emergency_contact: '',
      blood_type: '',
   
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
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'user/', action: 'POST', formData, start })
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm)
      // Valor por defecto para rol
      setValue('rol_id', 2)
      // Establecer valores del formulario
      setData(DataForm)
      // Indicar que se puede realizar la solicitud al API
      setStart(true)
    } catch (e) {
      // handle your error
    }
  }
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)
  useEffect(() => {
    if (responseData != null) {
      notify()
      return navigate('/user/login')
    }
  }, [responseData])
  const notify = () => toast.success('Usuario registrado', {
    duration: 4000,
    position: 'top-center'
  })
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Registrar Usuario
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='name'
                    label='Nombre'
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='email'
                    label='Email'
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
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
