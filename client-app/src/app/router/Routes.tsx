import { createBrowserRouter, RouteObject } from "react-router-dom";
import BroBizzPage from "../../features/BroBizz/BroBizzPage";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "brobizz", element: <BroBizzPage /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
