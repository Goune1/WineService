import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {NextUIProvider} from '@nextui-org/react'
import Home from "./pages/home"
import Cave from "./pages/cave"
import Login from"./pages/login"
import Signup from "./pages/signup"
import Consommation from "./pages/consommation"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },

  {
    path: '/cave',
    element: <Cave/>
  },

  {
    path: '/login',
    element: <Login/>
  },

  {
    path: '/signup',
    element: <Signup/>
  },

  {
    path: '/consommation',
    element: <Consommation/>
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
