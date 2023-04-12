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
import TableMovies from './components/TableMovies'
import { FormMovie } from './components/FormMovie'
import { Unauthorized } from './components/Unauthorized'
import { Login } from './components/Login'
import { Logout } from './components/Logout'
import { Signup } from './components/Signup'
import UserProvider from './components/UserProvider'
import { Auth } from './components/Auth'
import AppointmentCalendar from './components/AppointmentCalendar';

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
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
  },
  
  // Nuevas rutas
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
    path: 'movie/create/',
    element: <FormMovie/>
  },
  {
    path:'/movie/:id',
    element: <DetailMovie />
  },
  {
    path:'/big-calendar',
    element: <AppointmentCalendar />
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
