import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const SubscribedRoute = ({ children }) => {
    const { subscribed, isAdmin , loading, user, subscriptionLoading } = useAuth();

    if(loading || subscriptionLoading)
    {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user?.email)
    {
        if(subscribed || isAdmin)
        {
            return children;
        }
        else
        {
            return <Navigate to={'/subscription'}></Navigate>
        }
    }

    return (
        <Navigate to={'/login'}></Navigate>
    );
};

SubscribedRoute.propTypes = {
    children: PropTypes.element
}

export default SubscribedRoute;