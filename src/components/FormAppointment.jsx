import React, { useEffect, useState, useContext } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { SelectDoctor } from "./SelectDoctor";
import { SelectUser } from "./SelectUser";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment";
import AppointmentCalendar from "./AppointmentCalendar";
import { submitAppointments } from "../hooks/submitAppointments";

const styledGrid = {
  width: "auto",
  height: "4.5rem",
  marginTop: "1rem",
  marginBottom: "1rem",
};

const FormAppointment = (props) => {
  const [start, setStart] = useState(false);
  const [formData, setData] = useState(null)
  const [selectSlot, setSelectSlot] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [userId, setUserId] = useState("");
  const onError = (errors, e) => console.log(errors, e);
  const appointmetSchema = yup.object({
    consulting_room: yup.string().required("Denifir la sala")
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      consulting_room: ""
    },
    resolver: yupResolver(appointmetSchema),
  });

  const handleSelectDoctor = (doctorId) => {
    setDoctorId(doctorId);
    setData({ doctorId, userId });
  };

  const handleSelectUser = (userId) => {
    setUserId(userId);
    setData({ userId, doctorId });
  };

  const handleSelectSlot = (event) => {
    setSelectSlot(event);
    setData({ userId, doctorId, start: event.start ,end: event.end, title: event.title });
  };

  const { responseData, errorData, loadedData } = submitAppointments({
    endpoint: "/appointments",
    action: "POST",
    body: formData,
    start
  });

  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      ;

      setData({
        user_id:userId, 
        doctor_id:doctorId, 
        date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), 
        description: selectSlot.title, 
        consulting_room: DataForm.consulting_room, 
        status: 'P', 
        init_datetime: selectSlot.start,
        end_datetime: selectSlot.end});
      // Indicar que se puede realizar la solicitud al API
      setStart(true);
    } catch (e) {
      // handle your error
      
    }
  };

  useEffect(() => {
    if (responseData != null) {
        window.location.reload();
    }
  }, [responseData])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid sx={styledGrid}>
          <SelectDoctor onData={handleSelectDoctor} />
        </Grid>
        <Grid sx={styledGrid}>
          <SelectUser onData={handleSelectUser} />
        </Grid>
        <Grid sx={styledGrid}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
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
        </Grid>
        <Grid item xs={12} sm={12}>
          <AppointmentCalendar onData={(event)=>handleSelectSlot(event)} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ m: 1 }}
          >
            Agendar
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default FormAppointment;
