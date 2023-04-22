import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "../context/UserContext";
import { blood_type } from "../context/catalog";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

import * as yup from "yup";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Select,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export function User({ user_id }) {
  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState(null);
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);
  const loginSchema = yup.object({
    user_id: yup.string().required("El numero de identificacion es requerido"),
    name: yup.string().required("El nombre es requerido"),
    username: yup.string().required("El nombre de usuario es requerido"),
    password: yup.string().required("La contrasena es requerida"),
    lastname_one: yup.string().required("El primer apellido es requerido"),
    lastname_two: yup.string().required("El segundo apellido es requerido"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      user_id: "",
      name: "",
      username: "",
      password: "",
      lastname_one: "",
      lastname_two: "",

      genre: "o",
      address: "",
      date_of_birth: "",
      contact: "",
      emergency_contact: "",
      blood_type: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
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
        <CardHeader title="Cuenta" subheader="Administrar Usuario" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2} sm={2}>
              <MenuItem
                color="secondary"
                component="a"
                href="/user"
                sx={{ backgroundColor: "rgba(17, 25, 39, 0.04)" }}
              >
                <Typography textAlign="center">Mi cuenta</Typography>
              </MenuItem>
            </Grid>
            <Grid item xs={10} sm={10}>
              <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <Card>
                  <CardHeader title={userData.email} />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={6} wrap="wrap">
                      <Grid item xs={12} sm={6} md={6}>
                        <Stack spacing={1}>
                          <Typography variant="h6">
                            Informacion persona
                          </Typography>
                          <Stack>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="username"
                                    label="Nombre de Usuario"
                                    error={Boolean(errors.username)}
                                    helperText={
                                      errors.username
                                        ? errors.username.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="name"
                                    label="Nombre"
                                    error={Boolean(errors.name)}
                                    helperText={
                                      errors.name ? errors.name.message : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>{" "}
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="lastname_one"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="lastname_one"
                                    label="Apellido 1"
                                    error={Boolean(errors.lastname_one)}
                                    helperText={
                                      errors.lastname_one
                                        ? errors.lastname_one.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>{" "}
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="lastname_two"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="lastname_two"
                                    label="Apellido 2"
                                    error={Boolean(errors.lastname_two)}
                                    helperText={
                                      errors.lastname_two
                                        ? errors.lastname_two.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>{" "}
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="user_id"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="user_id"
                                    label="Numero de identificacion"
                                    error={Boolean(errors.user_id)}
                                    helperText={
                                      errors.user_id
                                        ? errors.user_id.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>{" "}
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="email"
                                    label="Email"
                                    error={Boolean(errors.email)}
                                    helperText={
                                      errors.email ? errors.email.message : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>{" "}
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="password"
                                    label="Contraseña"
                                    type="password"
                                    error={Boolean(errors.password)}
                                    helperText={
                                      errors.password
                                        ? errors.password.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="password"
                                    label="Verificar contraseña"
                                    type="password"
                                    error={Boolean(errors.password)}
                                    helperText={
                                      errors.password
                                        ? errors.password.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <Stack spacing={1}>
                          <Typography variant="h6">
                            Informacion medica
                          </Typography>
                          <Stack>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="blood_type"
                                control={control}
                                render={({ field }) => (
                                  <>
                                    <InputLabel id="blood_type_label">
                                      Tipo de Sangre
                                    </InputLabel>
                                    <Select
                                      {...field}
                                      labelId="blood_type_label"
                                      id="blood_type"
                                      label="Tipo de Sangre"
                                      onChange={(e, newValue) => {
                                        setValue(
                                          "blood_type",
                                          newValue.props.value,
                                          {
                                            shouldValidate: true,
                                          }
                                        );
                                      }}
                                    >
                                      {blood_type.map((row) => (
                                        <MenuItem
                                          key={row.blood_type}
                                          value={row.blood_type}
                                        >
                                          {row.blood_name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </>
                                )}
                              />
                            </FormControl>

                            <FormControl variant="standard" sx={{ m: 1 }}>
                              <Controller
                                name="genre"
                                control={control}
                                render={({ field }) => (
                                  <>
                                    <FormLabel id="radio-buttons-group-label">
                                      Gender
                                    </FormLabel>
                                    <RadioGroup
                                      {...field}
                                      row
                                      aria-labelledby="radio-buttons-group-label"
                                      id="genre"
                                      defaultValue="o"
                                      name="radio-buttons-group"
                                      onChange={(e, newValue) => {
                                        setValue("genre", newValue, {
                                          shouldValidate: true,
                                        });
                                      }}
                                    >
                                      <FormControlLabel
                                        value="f"
                                        control={<Radio />}
                                        label="Femenina"
                                      />
                                      <FormControlLabel
                                        value="m"
                                        control={<Radio />}
                                        label="Masculino"
                                      />
                                      <FormControlLabel
                                        value="o"
                                        control={<Radio />}
                                        label="Otro"
                                      />
                                    </RadioGroup>
                                  </>
                                )}
                              />
                            </FormControl>

                            <FormControl variant="standard" sx={{ m: 1 }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DateField"]}>
                                  <DateField label="Basic date field" />
                                </DemoContainer>
                              </LocalizationProvider>
                            </FormControl>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions
                    sx={{ justifyContent: "flex-end", margin: "20px" }}
                  >
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
