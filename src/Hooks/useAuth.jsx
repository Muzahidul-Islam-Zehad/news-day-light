import { useContext } from "react";
import { AuthContextProvider } from "../Provider/AuthProvider";

const useAuth = () => {
    const authContext = useContext(AuthContextProvider);
    return authContext;
};

export default useAuth;