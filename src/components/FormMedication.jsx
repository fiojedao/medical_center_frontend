// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { useCallApi } from "../hooks/useCallApi";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function FormMedication() {
  const navigate = useNavigate();
  const routeParams = useParams();
  // Id de la pelicula a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);
  // Esquema de validación
  const medicationSchema = yup.object({
    name: yup.string().required("El nombre es requerido"),
    description: yup.string().required("Debe escoger la categoría"),
    dose: yup.string().required("El nombre es requerido"),
    type: yup.string().required("Debe escoger la categoría"),
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
      description: "",
      dose: "",
      type: "",
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(medicationSchema),
  });

  //  const isItemSelected = isSelected(row.code_id)
  //  const labelId = `enhanced-table-checkbox-${index}`
  // Valores de formulario
  const [formData, setData] = useState(null);
  // Accion: post, put
  const [action, setAction] = useState("POST");
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);



  // Obtener la informacion de la pelicula a actualizar
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: `medication/${id}` });
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "medication",
    action,
    formData,
    start,
  });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      console.log(DataForm);
      setData(DataForm);
      // Indicar que se puede realizar la solicitud al API
      setStart(true);
      // Establecer el tipo de métod HTTP
      if (esCrear) {
        setAction("POST");
      } else {
        setAction("PUT");
      }
    } catch (e) {
      // handle your error
    }
  };
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la pelicula que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(() => {
    if (responseData != null) {
      toast.success(responseData, {
        duration: 4000,
        position: "top-center",
      });
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate("/medication-table");
    }
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data[0]);
      console.log(data[0]);
    }
  
  }, [responseData, data, esCrear, action]);

  React.useEffect(() => {
   
    if (responseData != null) {
        setStart(true);
    }
  }, [responseData]);

  return (
    <>
     
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom>
                {esCrear ? "Crear" : "Modificar"} Medicamento
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* ['filled','outlined','standard']. */}
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="name"
                      label="Nombre"
                      error={Boolean(errors.name)}
                      helperText={errors.name ? errors.name.message : " "}
                    />
                  )}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="description"
                      label="Descripcion"
                      error={Boolean(errors.description)}
                      helperText={errors.description ? errors.description.message : " "}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <Controller
                  name="dose"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="dose"
                      label="Dosis"
                      error={Boolean(errors.dose)}
                      helperText={errors.dose ? errors.dose.message : " "}
                    />
                  )}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="type"
                      label="Tpo"
                      error={Boolean(errors.type)}
                      helperText={errors.type ? errors.type.message : " "}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ m: 1 }}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      
    </>
  );
}