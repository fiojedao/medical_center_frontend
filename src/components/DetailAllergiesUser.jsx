import { useEffect, useState, useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { useCallApi } from "../hooks/useCallApi";
import { useCallApiDetail } from "../hooks/useCallApiDetail";
import { useNavigate, useParams, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


export function DetailAllergiesUser() {
    const routeParams = useParams();
    const [start, setStart] = useState(false);
    const [start2, setStart2] = useState(false);
    const [allergias, setAllergias] = useState([]);
    const navigate = useNavigate();
    const usuario = useCallApi({
        endpoint: "userauth",
    });

    const [id, setID] = useState(null);

    useEffect(() => {
        if (usuario.data != null) {
            setStart(true);
            setID(usuario.data[1].user_id);
        }
    }, [usuario]);

   // const data2 = useCallApiDetail({ endpoint: `allergies/getByUser/'${id}'` });
    const data2 = useCallApiDetail({ endpoint: `allergies/getByUser/'u00001'` });
    useEffect(() => {
        if (data2.data != null) {

        }
    }, [data2]);

    const crear=() =>{
       // return navigate(`/allergiesUser-table/'${id}'`);
        return navigate(`/allergiesUser-table`);
    }

    return (
        <>
            {data2.data && (
                <Grid>
                    <Typography variant="h6" component="h1" gutterBottom>
                        Cantidad total de alergias registradas: {data2.data.length}
                    </Typography>
                    {data2.data.map((row, index) => (
                        <Container key={index} component="main" sx={{ mt: 5, mb: 2, border: '2px solid gray', }} maxWidth="sm">

                            <Typography variant="body1">
                                <Box fontWeight="bold">Nombre de alergia:</Box>
                                <List
                                    sx={{
                                        width: "100%",
                                        maxWidth: 360,
                                        bgcolor: "background.paper",

                                    }}
                                >
                                    <ListItemText primary={row.name} />
                                </List>
                            </Typography>
                           
                        </Container>
                    ))}
                     <Grid item xs={12} sm={12}>
                                <Button
                                   onClick={crear}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ ml: "46%" ,mr: "50% ",  marginTop:"40px", marginBottom:"40px",  textAlign: "center"}}
                                >
                                 Agregar
                                </Button>
                            </Grid>
                </Grid>
            )}

        </>
    );
}