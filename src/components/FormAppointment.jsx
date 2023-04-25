import React, { useEffect, useState, useContext } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { SelectDoctor } from "./SelectDoctor";
import { SelectUser } from "./SelectUser";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import AppointmentCalendar from "./AppointmentCalendar";
import { useSubmitForm  } from "../hooks/useSubmitForm";
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
import toast from 'react-hot-toast'

const FormAppointment = (props) => {
  const [start, setStart] = useState(false);
  const [formData, setData] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [values, setValues] = useState(null);

  const appointmetSchema = yup.object({
    consulting_room: yup.string().required("Denifir la sala"),
    doctor_id: yup.string().required("Denifir la sala"),
    user_id: yup.string().required("Denifir la sala"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      consulting_room: "",
      doctor_id: "",
      user_id: "",
      description: "",
      init_datetime: "",
      end_datetime: "",
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(appointmetSchema),
  });

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "appointments",
    action: "POST",
    formData,
    start,
  });

  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      setData({
        user_id: DataForm.user_id,
        doctor_id: DataForm.doctor_id,
        date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        consulting_room: DataForm.consulting_room,
        status: "P",
        description: DataForm.description,
        init_datetime: DataForm.init_datetime,
        end_datetime: DataForm.end_datetime,
      });
      // Indicar que se puede realizar la solicitud al API
      setStart(true);
    } catch (e) {
      // handle your error
    }
  };

  useEffect(() => {
    if (responseData != null && responseData.isValid == null) {
      toast.success("Cita creada existosamente", {
        duration: 4000,
        position: 'top-center'
      });
    } else if (responseData != null && responseData.isValid == false){
      toast.error(responseData.results, {
        duration: 4000,
        position: 'top-center'
      });
    }
  }, [responseData]);

  return (
    <>
      {" "}
      <Card>
        <CardHeader title="Cuenta" subheader="Administrar Usuario" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <Card>
                  <CardActions
                    sx={{ justifyContent: "flex-end", margin: "20px" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{ m: 1 }}
                    >
                      Guardar
                    </Button>
                  </CardActions>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={6} wrap="wrap">
                      <Grid item xs={12} sm={4} md={4}>
                        <Stack spacing={1}>
                          <Stack>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <SelectDoctor
                                id="doctor_id"
                                onData={(newValue) => {
                                  setDoctorId(newValue.target.value);
                                  setValue("doctor_id", newValue.target.value, {
                                    shouldValidate: true,
                                  });
                                }}
                                error={Boolean(errors.doctor_id)}
                                errMessage={
                                  errors.doctor_id
                                    ? errors.doctor_id.message
                                    : " "
                                }
                              />
                            </FormControl>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              <SelectUser
                                id="user_id"
                                onData={(newValue) => {
                                  setValue("user_id", newValue.target.value, {
                                    shouldValidate: true,
                                  });
                                }}
                                error={Boolean(errors.user_id)}
                                errMessage={
                                  errors.user_id ? errors.user_id.message : " "
                                }
                              />
                            </FormControl>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            >
                              {" "}
                              <Controller
                                name="consulting_room"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="consulting_room"
                                    label="Sala"
                                    error={Boolean(errors.consulting_room)}
                                    helperText={
                                      errors.consulting_room
                                        ? errors.consulting_room.message
                                        : " "
                                    }
                                  />
                                )}
                              />
                            </FormControl>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={8} md={8}>
                        <Stack spacing={1}>
                          <Stack>
                            <FormControl variant="standard" sx={{ m: 1 }}>
                              <AppointmentCalendar
                              enabled={true}
                                doctor_id={doctorId}
                                onData={(event) => {
                                  setValue("description", event.title, {
                                    shouldValidate: true,
                                  });
                                  setValue("init_datetime", event.start, {
                                    shouldValidate: true,
                                  });
                                  setValue("end_datetime", event.end, {
                                    shouldValidate: true,
                                  });
                                }}
                              />
                            </FormControl>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            ></FormControl>{" "}
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            ></FormControl>
                            <FormControl
                              variant="standard"
                              sx={{ m: 1 }}
                            ></FormControl>
                            <FormControl
                              variant="standard"
                              fullWidth
                              sx={{ m: 1 }}
                            ></FormControl>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default FormAppointment;
