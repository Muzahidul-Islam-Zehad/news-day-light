import PropTypes from "prop-types";
import { createContext } from "react";

export const AuthContextProvider = createContext();

const AuthProvider = ({children}) => {

    

    const authInfo = {

    }
    return (
        <AuthContextProvider.Provider value={authInfo}>
            {
                children
            }
        </AuthContextProvider.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthProvider;