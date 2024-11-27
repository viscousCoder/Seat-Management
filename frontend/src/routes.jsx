import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

const routes = () => {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default routes;
