import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useCallApi } from '../hooks/useCallApi'

export function SelectActors ({ field }) {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: 'actor' })
  return (
    <>
      {loaded && (
        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>

          <InputLabel id='actor'>Actor</InputLabel>
          <Select
            {...field}
            labelId='actor'
            label='actor'
            defaultValue=''
            value={field.value}
          >
            {data.map((actor) => (
              <MenuItem key={actor.id} value={actor.id}>
                {actor.fname} {actor.lname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  )
}
