import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useState, useEffect, useContext } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from '../context/UserContext'
import * as yup from "yup";
import {
  Container,
  MenuItem,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  TextField,
  Divider,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export function User({ user_id }) {
  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState(null);
  const {user, decodeToken, autorize } = useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())

  useEffect(()=>{
    setUserData(decodeToken())
  },[user])
  console.log(userData)
  const diseasesSchema = yup.object({
    name: yup.string().required("El nombre es requerido"),
    medical_specialities_code: yup
      .string()
      .required("Debe escoger la especailidad"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      name: "",
      medical_specialities_code: "",
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(diseasesSchema),
  });

  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (DataForm) => {
    try {
    } catch (e) {
      // handle your error
    }
  };

  return (
    <>
      {" "}
      <Card>
        <CardHeader
            title="Cuenta"
            subheader="Administrar Usuario"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2} sm={2}>
              <MenuItem color="secondary" component="a" href="/user">
                <Typography textAlign="center">Mi cuenta</Typography>
              </MenuItem>
            </Grid>
            <Grid item xs={10} sm={10}>
              <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <Card>
                  <CardHeader
                    title={userData.email}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={6} wrap="wrap">
                      <Grid xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                          <Typography variant="h6">Informacion persona</Typography>
                          <Stack>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item md={4} sm={6} xs={12}>
                        <Stack spacing={1}>
                          <Typography variant="h6">Informacion medica</Typography>
                          <Stack>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "flex-end", margin: "20px" }}>
                    <Button variant="contained">Save</Button>
                  </CardActions>
                </Card>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}