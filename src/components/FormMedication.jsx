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
  // Id de la medicamento a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);
  // Esquema de validación
  const medicationSchema = yup.object({
    name: yup.string().required("El nombre es requerido"),
    description: yup.string().required("La descripcion es requerida"),
    dose: yup.string().required("La dosis es requerida"),
    type: yup.string().required("El tipo del medicamento es requerido"),
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



  // Obtener la informacion de la medicamento a actualizar
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: `medication`,  param$:id });
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
  const onError = (errors, e) => {
    if (esCrear ) {
      toast.error("Error, debe de completar los espacios requeridos para crear el medicamento");
    }else{
      toast.error("Error, no se ha podido actualizar el medicamento, debe completar los espacios requeridos");
    }  
  };
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la medicamento que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(() => {
    if (responseData != null) {
      setStart(true);
      if (!esCrear && data) {
        const nombre = data[0].name;
        toast.success("Medicamento " + nombre + " actualizado correctamente");
      } else {
        toast.success(
          "Medicamento " +
          responseData[0].name +
          " creado correctmente correctamente"
        );
      }
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate("/medication-table");
    }
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data[0]);
      console.log(data[0]);
    }
  
  }, [responseData, data, esCrear, action]);

 

  return (
    <>
     
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1} style={{
            textAlign: "center", border: '2px solid gray', 
            justifyContent: 'center',  marginTop:"50px"
          }}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom style={{ textAlign: "center", backgroundColor: 'gray', color: 'white', marginRight:'10px' ,marginBottom:'20px' }}>
                {esCrear ? "Crear" : "Modificar"} Medicamento
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* ['filled','outlined','standard']. */}
              <FormControl variant="standard" fullWidth sx={{ m: 2 }}>
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
              <FormControl variant="standard" fullWidth sx={{ m: 2 }}>
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
              <FormControl variant="standard" fullWidth sx={{ m: 2 }}>
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
              <FormControl variant="standard" fullWidth sx={{ m: 2 }}>
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
