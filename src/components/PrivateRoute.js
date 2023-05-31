import { Navigate } from "react-router-dom";
import config from "../config";


function PrivateRoute({ children }) {

    let user = null;

    if (sessionStorage.getItem("user") != null) user = sessionStorage.getItem("user")

    return user ? children : <Navigate to={config.route.login} />
}

export default PrivateRoute;