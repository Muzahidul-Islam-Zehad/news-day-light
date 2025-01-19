import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfig";
import useAxiosSecure from "../Hooks/useAxiosSecure";



export const AuthContextProvider = createContext();



const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                axiosSecure.get(`/isPremium?email=${currentUser.email}`)
                .then(res =>{
                    if(res.data === false)
                    {
                        // logoutUser();
                        axiosSecure.patch('/remove/subscription', {email : currentUser.email});
                        setSubscribed(false);
                    }
                    else{
                        setSubscribed(true);
                    }
                })


                setLoading(false);
            }
            else {
                setUser([]);
                setLoading(false);
            }
        })

        return () => unSubscribe();
    }, [])
    console.log('current user ---->', user);

    const googleLogin = () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const registerWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (updatedDoc) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedDoc);
    }

    const loginWithEmainAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        loading,
        setLoading,
        googleLogin,
        user,
        setUser,
        logoutUser,
        registerWithEmailAndPassword,
        updateUserProfile,
        loginWithEmainAndPassword,
        subscribed
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