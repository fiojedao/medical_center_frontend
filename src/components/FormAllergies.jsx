// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText, Select, InputLabel, MenuItem } from "@mui/material";
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

export function FormAllergies() {
  const navigate = useNavigate();
  const routeParams = useParams();
  // Id de la allegia a actualizar
  const id = routeParams.id || null;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);
  // Esquema de validación
  const allergieSchema = yup.object({
    name: yup.string().required("El nombre es requerido"),
    id_category: yup.string().required("Debe escoger la categoría"),
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
      id_category: "",
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(allergieSchema),
  });

  //  const isItemSelected = isSelected(row.code_id)
  //  const labelId = `enhanced-table-checkbox-${index}`
  // Valores de formulario
  const [formData, setData] = useState(null);
  // Accion: post, put
  const [action, setAction] = useState("POST");
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);

  const categorias = useCallApi({
    endpoint: "allergycategory",
  });

  // Obtener la informacion de la allegia a actualizar
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: `allergies/${id}` });
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "allergies",
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
       
  
     
      // Establecer el tipo de métod HTTP
      if (esCrear) {
        setAction("POST");
      } else {
        setAction("PUT");
      }
      setStart(true);
    } catch (e) {

      // handle your error
    }
  };
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la allegia que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(() => {
    if (responseData != null) {
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate("/allergies-table");
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
      {categorias.data && (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom>
                {esCrear ? "Crear" : "Modificar"} Allergia
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* ['filled','outlined','standard']. */}
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <Controller
                  name="id_category"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel id="id_category-label">Categoria</InputLabel>
                      <Select
                        {...field}
                        labelId="id_category-label"
                        id="id_category"
                        label="Categoria"
                        onChange={(e, newValue) => {
                          console.log(newValue)
                          setValue("id_category", newValue.props.value, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        {categorias.data.map((row, index) => (
                         
                          <MenuItem key={index} value={row.category_id}>
                            {row.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
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
