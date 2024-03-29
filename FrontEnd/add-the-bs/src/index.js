import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Admin from "./Pages/Admin";
import Details from "./Pages/Details";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import MovieSearch from "./Pages/MovieSearch";
import ActorSearch from "./Pages/ActorSearch";
import GenreDisplay from "./Pages/GenreDisplay";
import GenreList from "./Pages/GenreList";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (<><Login /></>)
  },
  {
    path: "/signup",
    element: (<><Signup/></>)
  },
  {
    path: "/",
    element: (<><Navbar /><App /><Footer /></>)
  },
  {
    path: "/profile",
    element: (<><Navbar /><Profile /><Footer /></>)
  },
  {
    path: "/MovieInfo/:id",
    element: (<><Navbar /><Details /><Footer /></>)
  },
  {
    path: "/GenreList/:name",
    element: (<><Navbar /><GenreList /><Footer /></>)
  },
  {
    path: "/admin",
    element: (<><Navbar /><Admin /><Footer /></>)
  },
  {
    path: "/movie",
    element: (<><Navbar/><MovieSearch/><Footer/></>)
  },
  {
    path: "/actors",
    element: (<><Navbar/><ActorSearch/><Footer/></>)
  },
  {
    path: "/genre",
    element: (<><Navbar/><GenreDisplay/><Footer/></>)
  },
  {
    path: "/*",
    element: (<><Navbar/><App/><Footer/></>)
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
