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
import TableMedication from './components/TableMedication'
import TableDoctors from './components/TableDoctors'
import {FormAllergies} from './components/FormAllergies'
import {FormDiseases} from './components/FormDiseases'
import {FormMedication} from './components/FormMedication'
import { Unauthorized } from './components/Unauthorized'
import { FormDoctor } from './components/FormDoctors'
import { Login } from './components/Login'
import { Logout } from './components/Logout'
import { Signup } from './components/Signup'
import UserProvider from './components/UserProvider'
import { Auth } from './components/Auth'
import FormAppointment from './components/FormAppointment';

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path: '/',
    element: <Auth allowedRoles={['Staff', 'Patient']} />,
    children: [
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
        path: '/medication-table',
        element: <TableMedication/>
      },
      {
        path: '/medication-create',
        element: <FormMedication/>
      },
      {
        path: '/medication-update/:id',
        element: <FormMedication />
      },
      {
        path:'/big-calendar',
        element: <FormAppointment />
      }
    ]
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
    path:'/doctor/create',
    element: <FormDoctor />
  },
  {
    path: '/doctors-table',
    element: <TableDoctors/>
  },
  {
    path: '/doctor-update/:id',
    element: <FormDoctor />
  },
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
