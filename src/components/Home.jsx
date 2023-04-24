import React from "react";
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useSubmitForm } from "../hooks/useSubmitForm";
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export function Home () {  
  const navigate = useNavigate()
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
      token
    },
    start
  });

  useEffect(() => {
    if(responseData){
      if(!responseData.isValid) {
        return navigate('/user/logout');
      }
      setStart(false);
    }
  }, [responseData]);

  if(user && !token){
    setToken(user);
    setStart(true);
  }

  return (
    <Container sx={{ p: 2 }} maxWidth='sm'>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='text.primary'
        gutterBottom
      >
        App-Centro médico
      </Typography>
      <Typography variant='h5' align='center' color='text.secondary' paragraph>
        Consulta toda la información sobre películas de cine en nuestra base de datos.
      </Typography>
    </Container>
  )
}
