import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material"; 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { blood_type } from "../context/catalog";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useCallApi } from "../hooks/useCallApi";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { useState, useEffect, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from 'moment';
import * as yup from "yup";
import dayjs from "dayjs";
import toast from 'react-hot-toast'

export function User() {
  // eslint-disable-next-line no-unused-vars
  const [start, setStart] = useState(false);
  const [values, setValues] = useState(null);
  const [formData, setData] = useState(values);
  const [changePass, setChangePass] = useState(false);
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);
  const loginSchema = yup.object({
    user_id: yup.string().required("El campo es requerido"),
    name: yup.string().required("El campo es requerido"),
    // username: yup.string().required("El campo es requerido"),
    // password: yup.string().required('El campo es requerido'),
    // passwordConfirmation: yup.string()
    //  .oneOf([yup.ref('password'), null], 'La contrase no es igual'),
    lastname_one: yup.string().required("El campo es requerido"),
    lastname_two: yup.string().required("El campo es requerido"),
    genre: yup.string().required("El campo es requerido"),
    // email: yup.string().required("El campo es requerido"),
    address: yup.string().required("El campo es requerido"),
    date_of_birth: yup.string().required("El campo es requerido"),
    contact: yup.string().required("El campo es requerido"),
    emergency_contact: yup.string().required("El campo es requerido"),
    blood_type: yup.string().required("El campo es requerido"),
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
      lastname_one: "",
      lastname_two: "",
      email: "",
      genre: "o",
      address: "",
      date_of_birth: dayjs("1950-04-17"),
      contact: "",
      emergency_contact: "",
      blood_type: "",
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  const { data, error, loaded } = useCallApi({ endpoint: `user/${userData.id}` });  
  
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "user/",
    action: "PUT",
    formData,
    start
  });

  useEffect(() => {    
    if (responseData != null) {
      setValues(responseData[0]);
      setData(responseData[0]);
      toast.success("Usuario Actualizado correctamente", {
        duration: 4000,
        position: 'top-center'
      });
      setStart(false);
    }
    if (data != null) {
      data.date_of_birth = dayjs(data.date_of_birth)
      setValues(data);
    }
  }, [data, responseData, loaded]);

  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (DataForm) => {
    try {    
      setData({
        user_id:DataForm.user_id,
        name:DataForm.name,
        lastname_one:DataForm.lastname_one,
        lastname_two:DataForm.lastname_two,
        genre:DataForm.genre,
        address:DataForm.address,
        date_of_birth:moment(DataForm.date_of_birth).format('L'),
        contact:DataForm.contact,
        emergency_contact:DataForm.emergency_contact,
        blood_type:DataForm.blood_type,
      });

      setStart(true);
      //setStart(true);
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
                            Informacion personal
                          </Typography>
                          <Stack>
                            {/* <FormControl
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
                                    type="text"
                                    error={Boolean(errors.username)}
                                    helperText={
                                      errors.username
                                        ? errors.username.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl> */}
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
                                    disabled
                                    {...field}
                                    id="user_id"
                                    type="text"
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
                                    type="text"
                                    error={Boolean(errors.name)}
                                    helperText={
                                      errors.name ? errors.name.message : " "
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
                                name="lastname_one"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="lastname_one"
                                    label="Apellido 1"
                                    type="text"
                                    error={Boolean(errors.lastname_one)}
                                    helperText={
                                      errors.lastname_one
                                        ? errors.lastname_one.message
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
                                name="lastname_two"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="lastname_two"
                                    label="Apellido 2"
                                    type="text"
                                    error={Boolean(errors.lastname_two)}
                                    helperText={
                                      errors.lastname_two
                                        ? errors.lastname_two.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1 }}>
                              <Controller
                                name="date_of_birth"
                                control={control}
                                render={({ field }) => (
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer components={["DateField"]}>
                                      <DateField
                                        {...field}
                                        format="MM-DD-YYYY"
                                        onChange={(newValue) => {
                                          setValue("date_of_birth", newValue, {
                                            shouldValidate: true,
                                          });
                                        }}
                                        label="Fecha de Nacimiento"
                                        error={Boolean(errors.emergency_contact)}
                                        helperText={
                                          errors.date_of_birth
                                            ? errors.date_of_birth.message
                                            : " "
                                        }
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                )}
                              />
                            </FormControl>
                            {/* <FormControl
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
                                    type="email"
                                    error={Boolean(errors.email)}
                                    helperText={
                                      errors.email ? errors.email.message : " "
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
                                name="passwordConfirmation"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="passwordConfirmation"
                                    label="Verificar contraseña"
                                    type="password"
                                    error={Boolean(errors.passwordConfirmation)}
                                    helperText={
                                      errors.passwordConfirmation
                                        ? errors.passwordConfirmation.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl> */}
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <Stack spacing={1}>
                          <Typography variant="h6">
                            Informacion adicional
                          </Typography>
                          <Stack>
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
                                      error={Boolean(errors.blood_type)}
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
                                    <FormHelperText sx={{ color: "#d32f2f" }}>
                                      {errors.blood_type
                                        ? errors.blood_type.message
                                        : " "}
                                    </FormHelperText>
                                  </>
                                )}
                              />
                            </FormControl>{" "}
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <Controller
                                name="contact"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="contact"
                                    type="text"
                                    label="Numero de Contacto"
                                    error={Boolean(errors.contact)}
                                    helperText={
                                      errors.contact
                                        ? errors.contact.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1 }}>
                              <Controller
                                name="emergency_contact"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="emergency_contact"
                                    label="Contacto de emergencia"
                                    type="text"
                                    error={Boolean(errors.emergency_contact)}
                                    helperText={
                                      errors.emergency_contact
                                        ? errors.emergency_contact.message
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
                                name="address"
                                control={control}
                                render={({ field }) => (
                                  <TextareaAutosize
                                    {...field}
                                    minRows="5"
                                    id="address"
                                    label="Direccion"
                                  />
                                )}
                              />
                              <FormHelperText sx={{ color: "#d32f2f" }}>
                                {errors.address ? errors.address.message : " "}
                              </FormHelperText>
                            </FormControl>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions
                    sx={{ justifyContent: "flex-end", margin: "20px" }}
                  ><Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Guardar</Button>
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
