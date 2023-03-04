import { createBrowserRouter, RouteObject } from "react-router-dom";
import BroBizzPage from "../../features/BroBizz/BroBizzPage";
import TripPage from "../../features/Trip/TripPage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/form/LoginForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "brobizz", element: <BroBizzPage /> },
      { path: "brobizz/:id", element: <TripPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "errors", element: <TestErrors /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
