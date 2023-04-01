// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FormHelperText } from '@mui/material'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../hooks/useSubmitForm'
import { useCallApi } from '../hooks/useCallApi'
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from 'react-router-dom'
import { SelectGenres } from './selectGenres'
import { ActorsForm } from './ActorsForm'
import toast from 'react-hot-toast'

export function FormMovie () {
  const navigate = useNavigate()
  const routeParams = useParams()
  // Id de la pelicula a actualizar
  const id = routeParams.id || null
  const esCrear = !id
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null)
  // Esquema de validación
  const movieSchema = yup.object({
    title: yup.string()
      .required('El título es requerido')
      .min(4, 'El título debe tener 4 caracteres'),
    time: yup.string()
      .required('El año es requerido'),
    year: yup.number()
      .typeError('Solo acepta números')
      .required('El año es requerido')
      .positive('Solo acepta números positivos'),
    lang: yup.string()
      .required('El idioma es requerido')
      .min(4, 'El idioma debe tener 4 caracteres'),
    genres: yup.array()
      .typeError('Seleccione un actor')
      .required('El genero es requerido')
      .of(yup.number()
        .min(1)),
    actors: yup.array().typeError('Seleccione un actor')
  })
  const { control, handleSubmit, setValue, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      title: '',
      year: '',
      lang: '',
      time: '',
      genres: [],
      actors: [
        {
          actor_id: '',
          role: ''
        }
      ]
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(movieSchema)
  })
  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  // eslint-disable-next-line no-unused-vars
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props provienen de useForm
    name: 'actors' // nombre único para el campo Array
  })
  // Eliminar actor de listado
  const removeActor = (index) => {
    if (fields.length === 1) {
      return
    }
    remove(index)
  }
  // Agregar un nuevo actor
  const addNewActor = () => {
    append({
      actor_id: '',
      role: ''
    })
  }
  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la pelicula a actualizar
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: `movie/getForm/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'movie', action, formData, start  })
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      console.log(DataForm)
      setData(DataForm)
      // Indicar que se puede realizar la solicitud al API
      setStart(true)
      // Establecer el tipo de métod HTTP
      if (esCrear) {
        setAction('POST')
      } else {
        setAction('PUT')
      }
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
      toast.success(responseData, {
        duration: 4000,
        position: 'top-center'
      })
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate('/movie-table')
    }
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data)
      console.log(data)
    }
  }, [responseData, data, esCrear, action])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              {esCrear ? 'Crear' : 'Modificar'} Pelicula
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='title'
                    label='Título'
                    error={Boolean(errors.title)}
                    helperText={errors.title ? errors.title.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='year'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='year'
                    label='Año'
                    error={Boolean(errors.year)}
                    helperText={errors.year ? errors.year.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='time'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='time'
                    label='Minutos'
                    error={Boolean(errors.time)}
                    helperText={errors.time ? errors.time.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='lang'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='lang'
                    label='Idioma'
                    error={Boolean(errors.lang)}
                    helperText={errors.lang ? errors.lang.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='genres'
                control={control}
                render={({ field }) =>
                  <SelectGenres
                    field={field}
                    onChange={(e) => setValue('genres', e.target.value, { shouldValidate: true })}
                    error={Boolean(errors.genres)}
                  />}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.genres ? errors.genres.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Typography variant='h6' gutterBottom>
                Actores
                <Tooltip title='Agregar Actor'>
                  <span>
                    <IconButton
                      color='secondary'
                      onClick={addNewActor}
                    >
                      <AddIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Typography>
              {/* Array de controles de actor */}
              {fields.map((field, index) => (
                <ActorsForm
                  key={index}
                  index={index}
                  onRemove={removeActor}
                  field={field}
                  control={control}
                  onChange={(e) => setValue('actors', e.target.value, { shouldValidate: true })}
                  disableRemoveButton={fields.length === 1}
                />
              ))}
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.actors ? errors.actors.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Guardar</Button>

          </Grid>
        </Grid>
      </form>
    </>
  )
}
