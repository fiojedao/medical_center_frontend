import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../hooks/useCallApi'

export function SelectDoctor (field) {
  const { data, error, loaded } = useCallApi({ endpoint: 'genre' })
  return (
    <>
      {loaded && (
        <>
          <InputLabel id='doctor'>Médico</InputLabel>
          <Select
            {...field}
            labelId='doctor'
            label='doctor'
            multiple
            defaultValue={[]}
            value={field.field.value}
          >
            {data.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.title}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  )
}
