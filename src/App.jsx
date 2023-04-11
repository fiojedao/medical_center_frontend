import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Layout } from './components/Layout'
import { ListMovies } from './components/ListMovies'
import { DetailMovie } from './components/DetailMovie'
import { Home } from './components/Home'
// Import from react-router-dom
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import TableAllergies from './components/TableAllergies'
import TableDiseases from './components/TableDiseases'
import {FormAllergies} from './components/FormAllergies'
import {FormDiseases} from './components/FormDiseases'
import { Unauthorized } from './components/Unauthorized'
import { Login } from './components/Login'
import { Logout } from './components/Logout'
import { Signup } from './components/Signup'
import UserProvider from './components/UserProvider'
import { Auth } from './components/Auth'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
 /* {
    path:'/',
    element: <Auth allowedRoles={['Administrador']}/>,
    children:[
      {
        path:'/movie-table',
        element: <TableMovies />
      },
    ]
  },
  {
    path:'/',
    element: <Auth allowedRoles={['Administrador','Usuario']}/>,
    children:[
      {
        path:'/movie/',
        element: <ListMovies />
      },
    ]
     {
    path: 'movie/create/',
    element: <FormAllergies/>
  },
  },*/
  
  // Nuevas rutas
  {
    path:'/allergies-table',
    element: <TableAllergies/>
  },
  {
    path: '/allergies-create',
    element: <FormAllergies />
  },
  {
    path: '/allergies-update/:id',
    element: <FormAllergies />
  },
  {
    path:'/diseases-table',
    element: <TableDiseases/>
  },
  {
    path: '/diaseases-create',
    element: <FormDiseases/>
  },
  {
    path: '/diaseases-update/:id',
    element: <FormDiseases />
  },
  {
    path:'/movie/',
    element: <ListMovies />
  },
  {
    path:'/unauthorized',
    element: <Unauthorized />
  },
  {
    path:'/user/login',
    element: <Login />
  },
  {
    path:'/user/logout',
    element: <Logout />
  },
  {
    path:'/user/create',
    element: <Signup />
  },
  
 
  {
    path:'/movie/:id',
    element: <DetailMovie />
  }
])

export function App(){
  return (
    <UserProvider>
      <Layout>
        <RouterProvider router={router}/>
      </Layout>
    </UserProvider>
  )
}
