import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location.pathname);
    if(loading){
        return <progress className="progress w-56 flex justify-center items-center"></progress>;
    }
    if(user)
    {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate> 
};

export default PrivateRoute;