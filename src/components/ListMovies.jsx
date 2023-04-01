import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import { AccessTime, Language, Info } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useCallApi } from '../hooks/useCallApi'

export function ListMovies () {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint:'movie' })
  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {!loaded && <div>Cargando...</div>}
      {data && data.map((item)=>(
          <Grid item xs={4} key={item.id} >
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white
                }}
                style={{ textAlign: 'center' }}
                title={item.title}
                subheader={item.year}
              />
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  <AccessTime /> {item.time}  minutos
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <Language /> {item.lang}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white
                }}
              >
                <IconButton key={item.id} component={Link} to={`/movie/${item.id}`}   aria-label='Detalle' sx={{ ml: 'auto' }}>
                  <Info />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          ))}
    </Grid>
  )
}
