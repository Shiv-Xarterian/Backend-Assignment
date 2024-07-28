import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedPage from "./Pages/ProtectedPage";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/protected",
    element: <ProtectedPage />,
  },
]);

export default App;
