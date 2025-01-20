import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfig";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContextProvider = createContext();



const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const axiosPublic = useAxiosPublic();
    const [subscribed, setSubscribed] = useState(false);
    const [subscriptionLoading, setSubscriptionLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
            
            if (currentUser) {
                // setLoading(true);
                setUser(currentUser);
                const userInfo = {email : currentUser.email}
                const {data} = await axiosPublic.post('/jwt', userInfo);

                if(data?.token)
                {
                    localStorage.setItem('token', data?.token);
                }
                

                axiosPublic.get(`/isPremium?email=${currentUser.email}`)
                .then(async(res) =>{
                    if((res.data) === false)
                    {
                        // logoutUser();
                        await axiosPublic.patch('/remove/subscription', {email : currentUser.email});
                        setSubscribed(false);
                        setSubscriptionLoading(false);
                    }
                    else{
                        setSubscribed(true);
                        setSubscriptionLoading(false);
                    }
                })
                
                setLoading(false);
            }
            else {
                localStorage.removeItem('token');
                setUser([]);
                setLoading(false);
                setSubscriptionLoading(false)
            }
        })

        return () => unSubscribe();
    }, [subscribed]);

    console.log('current user ---->', user, loading , subscribed);

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
        subscribed,
        setSubscribed,
        subscriptionLoading
        
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