import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { useParams } from 'react-router-dom'
import { useCallApi } from '../hooks/useCallApi'
export function DetailMovie () {
  const routeParams = useParams()
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint:`movie/${routeParams.id}` })
  return (   
    <>
     {!loaded && <div>Cargando..</div>}
     {data && 
        <div>
          <Container component='main' sx={{ mt: 8, mb: 2 }} maxWidth='sm'>
            <Typography variant='h4' component='h1' gutterBottom>
             {data.title}
            </Typography>
            <Typography variant='subtitle1' component='h1' gutterBottom>
              {data.year}
            </Typography>
            <Typography variant='body1'>
              <Box fontWeight='bold' display='inline'>Tiempo:</Box> {data.time} minutos
            </Typography>
            <Typography variant='body1'>
              <Box fontWeight='bold' display='inline'>Idioma:</Box> {data.lang}
            </Typography>
            <Typography variant='body1'>
              <Box fontWeight='bold'>Generos:</Box>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {data.genres.map((item)=>( 
                  <ListItemText key={item.id}  primary={item.title} />
                  ))}
              </List>
            </Typography>
            <Typography variant='body1'>
              <Box fontWeight='bold'>Actores:</Box>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {data.actors.map((item)=>( 
                  <ListItemText key={item.id}  primary={item.fname} />
                  ))}
              </List>
            </Typography>
          </Container>
        </div>
        }
    </>
  )
}
