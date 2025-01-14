import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfig";



export const AuthContextProvider = createContext();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            }
            else{
                setUser([]);
                setLoading(false);
            }
        })

        return () => unSubscribe();
    }, [])
    console.log('current user ---->',user);

    const googleLogin = () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const logoutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }
    
    const registerWithEmailAndPassword = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (updatedDoc) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, updatedDoc);
    }

    const loginWithEmainAndPassword = (email, password)=>{
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
        loginWithEmainAndPassword
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