import * as React from 'react';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../hooks/useCallApi';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export function SelectDoctor ({onData, category}) {
  const { data, error, loaded } = useCallApi({ endpoint: 'doctors', param: category });
  const [doctor, setDoctor] = React.useState("0");

  function handleChange(event) {
    setDoctor(event.target.value);
    onData(event.target.value)
  }

  return (
    <>
      {loaded && (
        <>
        <Box sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Médico</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Médicos"
            defaultValue={[]}
            value={doctor}
            onChange={handleChange}
          >
            
            <MenuItem value="0">
              <em>Médicos</em>
            </MenuItem>
            {data.map((doctors) => (
                <MenuItem key={doctors.doctor_id} value={doctors.doctor_id}>
                  {doctors.name}
                </MenuItem>
            ))}
          </Select>
          </Box>
        </>
      )}
    </>
  )
}
