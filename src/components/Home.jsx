import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import AppointmentCalendar from "./AppointmentCalendar";
import {
  Card,
  Container,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Stack,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export function Home() {
  const navigate = useNavigate();
  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = React.useState(decodeToken());
  const [start, setStart] = React.useState(false);
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "userauth/isauthenticate",
    action: "POST",
    formData: {
      token,
    },
    start,
  });

  useEffect(() => {
    if (responseData) {
      if (!responseData.isValid) {
        return navigate("/user/logout");
      }
      setStart(false);
    }
  }, [responseData]);

  if (user && !token) {
    console.log(user, token);
    setToken(user);
    setStart(true);
    return;
  }

  return (
    <Container sx={{ p: 2 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        App-Centro médico
      </Typography>
      <>
        {" "}
        <Card>
          <CardHeader title="Citas" subheader="Calendario de citas" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Stack spacing={1}>
                  <Stack>
                    <AppointmentCalendar enabled={false}/>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    </Container>
  );
}
