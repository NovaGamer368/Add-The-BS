import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Details from './Pages/Details';

const router = createBrowserRouter([
  { path: "/home",
    element:<><Navbar/><App/><Footer/></>
  },
  {
    path: "/login",
    element:<><Login/></>
  },
  {
    path: "/",
    element:<><Signup/></>
  },
  {
    path: "/profile",
    element:<><Navbar/><Profile/><Footer/></>
  },
  {
    path:"/MovieInfo/:title",
    element:<><Navbar/><Details/><Footer/></>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
