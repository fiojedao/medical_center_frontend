// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText, Select, InputLabel, MenuItem,  Box } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { useCallApi } from "../hooks/useCallApi";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router-dom";
import { SelectGenres } from "./selectGenres";
import toast from "react-hot-toast";

export function FormDoctor() {
  const navigate = useNavigate();
  const routeParams = useParams();
  // Id de la doctor a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);
  // Esquema de validación
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

  //  const isItemSelected = isSelected(row.code_id)
  //  const labelId = `enhanced-table-checkbox-${index}`
  // Valores de formulario
  const [formData, setData] = useState(null);
  // Accion: post, put
  const [action, setAction] = useState("POST");
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);

  const especialidad = useCallApi({
    endpoint: "medicalspecialities",
  });

  // Obtener la informacion de la doctor a actualizar
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({
    endpoint: `doctors/${id}`
  });
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "doctors",
    action,
    formData,
    start,
  });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario

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
      toast.error("Error, debe de completar los espacios requeridos para crear el doctor");
    }else{
      toast.error("Error, no se ha podido actualizar el doctor, debe completar los espacios requeridos");
    }  
  };
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la doctor que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(() => {
    if (responseData != null) {
      setStart(true);
      if (!esCrear && data) {
        const nombre = data[0].name;
        toast.success("Doctor(a) " + nombre + " actualizado(a) correctamente");
      } else {
        toast.success(
          "Doctor(a) " +
          responseData[0].name +
          " creado(a) correctmente correctamente"
        );
      }

      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate("/doctors-table");
    }
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data[0]);
      console.log(data[0]);
    } else {
    }
  }, [responseData, data, esCrear, action]);

  return (
    <>
      {especialidad.data && (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
  
          <Grid container spacing={1} style={{
            textAlign: "center", border: '2px solid gray', 
            justifyContent: 'center',  marginTop:"50px"
          }}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom style={{ textAlign: "center", backgroundColor: 'gray', color: 'white', marginRight:'10px' ,marginBottom:'20px' }}>
                {esCrear ? "Crear" : "Modificar"} Medico
              </Typography>
            </Grid>

            <Grid item xs={12} sm={5} style={{}} >
              <FormControl variant="standard" fullWidth sx={{ marginRight:'10px' , marginTop:'10px' }}>
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
            </Grid>
            <Grid item xs={12} sm={5} style={{left: '50%', 
        top: '50%',}}>
              {/* ['filled','outlined','standard']. */}
              <FormControl variant="standard" fullWidth sx={{marginLeft:'10px', marginTop:'10px'  }}>
                <Controller
                  name="medical_specialities_code"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel id="medical_specialities_code-label">
                        Especialidad
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="medical_specialities_code-label"
                        id="medical_specialities_code"
                        label="especialidad"
                        onChange={(e, newValue) => {
                          console.log(newValue);
                          setValue(
                            "medical_specialities_code",
                            newValue.props.value,
                            {
                              shouldValidate: true,
                            }
                          );
                        }}
                      >
                        {especialidad.data.map((row, index) => (
                          <MenuItem key={index} value={row.code_id}>
                            {row.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
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
      )}
    </>
  );
}
