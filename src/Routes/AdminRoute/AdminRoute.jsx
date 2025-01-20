import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {

    const {user, isAdmin, adminLoading, loading} = useAuth();

    if(loading || adminLoading)
    {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user?.email)
    {
        // console.log('user found in admin route');
        if(isAdmin)
        {
            
            return children;
        }
        else
        {
            // console.log('admin not found');
            return <Navigate to={'/'}></Navigate>
        }
    }
    
    return (
        <Navigate to={'/login'}></Navigate>
    );
};

AdminRoute.propTypes = {
    children: PropTypes.element
}

export default AdminRoute;