import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import CounterContextProvider from './Context/CounterContext.jsx';
import UserContextProvider from './Context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import PostContextProvider from './Context/PostContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import PostDetails from './Components/postDetails/postDetails';
import { Toaster } from 'react-hot-toast';

const query = new QueryClient()

const x = createBrowserRouter([
  {
    path : "",
    element : <Layout/>,
      children : [
        {index: true , element : <ProtectedRoute> <Home/> </ProtectedRoute>},
        {path : "profile", element : <ProtectedRoute> <Profile/> </ProtectedRoute>},
        {path : "postdetails/:id", element : <ProtectedRoute> <PostDetails/> </ProtectedRoute>},
        {path : "login", element : <Login/>},
        {path : "register", element : <Register/>},
        {path : "*", element : <Notfound/>},

  ]}
])


function App() {
  

  return (
    <>
      <UserContextProvider>
        <PostContextProvider>
          <CounterContextProvider>
            <QueryClientProvider client={query}>
              <RouterProvider router={x} ></RouterProvider>
              <Toaster />
              <ReactQueryDevtools/>
            </QueryClientProvider>
          </CounterContextProvider>
        </PostContextProvider>
      </UserContextProvider>
      
    </>
  )
}

export default App
 