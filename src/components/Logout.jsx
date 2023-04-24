import React from "react";
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useSubmitForm } from "../hooks/useSubmitForm";

export function Logout () {
  const navigate = useNavigate()
  const { user, decodeToken, autorize } = useContext(UserContext);
  const { clearUser } = useContext(UserContext);  
  const [userData, setUserData] = React.useState(decodeToken());

  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "userauth/logout",
    action: "POST",
    formData: {
      useremail: userData.email,
      token: user
    },
    start: true
  });
  useEffect(() => {
    clearUser()
    return navigate('/user/login')
  }, [])
  return null
}
