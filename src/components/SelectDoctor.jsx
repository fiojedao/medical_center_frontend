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

export function SelectDoctor({ onData, category, id, err, errMessage }, { ...field }) {
  const { data, error, loaded } = useCallApi({
    endpoint: "doctors"
  });

  return (
    <>
      {loaded && (
        <>
        <Box>
            <InputLabel id="simple-select-label">Médico</InputLabel>
            <Select
              fullWidth
              {...field}
              labelId="simple-select-label"
              id={id}
              label="Médicos"
              defaultValue={[]}
              onChange={onData}
              error={Boolean(err)}
            >
              <MenuItem value="">
                <em>Médicos</em>
              </MenuItem>
              {data.map((doctors) => (
                <MenuItem key={doctors.doctor_id} value={doctors.doctor_id}>
                  {doctors.name}
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
