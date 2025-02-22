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
    const [isAdmin, setIsAdmin] = useState(false);
    const [subscriptionLoading, setSubscriptionLoading] = useState(true);
    const [adminLoading, setAdminLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
      );

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {

            if (darkMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
              } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
              }
            
            if (currentUser) {
                // setLoading(true);
                setUser(currentUser);
                const userInfo = {email : currentUser.email}
                const {data} = await axiosPublic.post('/jwt', userInfo);

                if(data?.token)
                {
                    localStorage.setItem('token', data?.token);
                }

                //check isAdmin
                const {data : isadmin} = await axiosPublic.get(`/check/isAdmin?email=${currentUser.email}`);
                setIsAdmin(isadmin?.isAdmin);
                // console.log('isAdmin', isadmin);
                
                //check isSubscribed
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
                setAdminLoading(false);
                setLoading(false);
            }
            else {
                localStorage.removeItem('token');
                setUser([]);
                setLoading(false);
                setSubscriptionLoading(false);
                setAdminLoading(false)
            }
        })

        return () => unSubscribe();
    }, [subscribed, darkMode]);

    // console.log('current user ---->', user, loading , isAdmin);

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
        subscriptionLoading,
        isAdmin,
        adminLoading,
        setAdminLoading,
        darkMode, 
        setDarkMode,
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