import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Navigation from "../components/Navigation";
import Home from "./Home";
import Users from "./Users";
import Login from "./Login";
import FirstLogin from "./FirstLogin";
import Profile from "./Profile";
import RickAndMorty from "./RickAndMorty";
import Pokemon from "./Pokemon";
import Versus from "./Versus";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <>
          <Navigation />
          <ProtectedRoute />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/rick-and-morty",
          element: <RickAndMorty />,
        },
        {
          path: "/pokemon",
          element: <Pokemon />,
        },
        {
          path: "/versus",
          element: <Versus />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/changePassword/:id",
      element: <FirstLogin />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
