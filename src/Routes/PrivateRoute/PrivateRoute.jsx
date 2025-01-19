import { Navigate, } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import PropTypes from "prop-types";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    // const navigate = useNavigate()

    if(loading)
    {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user?.email)
    {
        return children;
    }

    return (
        <Navigate to={'/login'}></Navigate>
    );
};

PrivateRoute.propTypes = {
    children : PropTypes.element
}

export default PrivateRoute;