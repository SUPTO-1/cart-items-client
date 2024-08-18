import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Root from "../Root/Root";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import PrivateRoute from "../Providers/PrivateProvider";
import Error from "../Error/Error";
const routes = createBrowserRouter([
    {
        path: "/",
        element:<Root></Root>,
        errorElement:<Error></Error>,
        children:[
            {
                path: "/",
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: "/login",
                element:<Login></Login>
            },
            {
                path: "/signup",
                element:<SignUp></SignUp>
            }
        ]

    }
])
export default routes;