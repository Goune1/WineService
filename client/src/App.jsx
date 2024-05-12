import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/home"
import Cave from "./pages/cave"
import NewBottle from "./pages/newBottle"
import Login from"./pages/login"
import Signup from "./pages/signup"

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
    path: '/newBottle',
    element: <NewBottle/>
  },

  {
    path: '/login',
    element: <Login/>
  },

  {
    path: '/signup',
    element: <Signup/>
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
