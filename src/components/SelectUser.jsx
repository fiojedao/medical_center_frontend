import * as React from "react";
import { useCallApi } from "../hooks/useCallApi";
import {
  Box,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export function SelectUser({ onData, id, err, errMessage }, { ...field }) {
  const { data, error, loaded } = useCallApi({ endpoint: "user" });

  return (
    <>
      {loaded && (
        <>
          <Box>
            <InputLabel id="user-select-label">Pacientes</InputLabel>
            <Select
              fullWidth
              {...field}
              labelId="user-select-label"
              id={id}
              label="Pacientes"
              defaultValue={[]}
              onChange={onData}
              error={Boolean(err)}
            >
              <MenuItem value="">
                <em>Pacientes</em>
              </MenuItem>
              {data.map((obj) => (
                <MenuItem key={obj.id} value={obj.user_id}>
                  {`${obj.name} ${obj.lastname_one} ${obj.lastname_two}`}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {errMessage}
            </FormHelperText>
          </Box>
        </>
      )}
    </>
  );
}
