import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_local_server}`,
})

const useAxiosSecure = () => {
    const {logoutUser, setLoading} = useAuth();
    const navigate = useNavigate();




    axiosSecure.interceptors.request.use(function (config) {

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    },
        function (error) {
            return Promise.reject(error);
        }
    )

    axiosSecure.interceptors.response.use((response)=>{

        return response;
    },
    async(error)=>{

        const status = error.response.status;
        // console.log(status);
        if(status === 401 || status=== 403)
        {
            await logoutUser();
            navigate('/login');
            setLoading(false);
        }
        return Promise.reject(error);
    }
)

    return axiosSecure;
};

export default useAxiosSecure;