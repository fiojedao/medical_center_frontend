import * as React from 'react';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../hooks/useCallApi';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export function SelectUser ({onData}) {
  const { data, error, loaded } = useCallApi({ endpoint: '/user' });
  const [user, setUser] = React.useState("0");

  function handleChange(event) {
    setUser(event.target.value);
    onData(event.target.value)
  }

  return (
    <>
      {loaded && (
        <>
        <Box sx={{ minWidth: 120 }}>
          <InputLabel id="user-select-label">Pacientes</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            label="Pacientes"
            defaultValue={[]}
            value={user}
            onChange={handleChange}
          >
            
            <MenuItem value="0">
              <em>Pacientes</em>
            </MenuItem>
            {data.map((obj) => (
                <MenuItem key={obj.id} value={obj.user_id}>
                  {`${obj.name} ${obj.lastname_one} ${obj.lastname_two}`}
                </MenuItem>
            ))}
          </Select>
          </Box>
        </>
      )}
    </>
  )
}
