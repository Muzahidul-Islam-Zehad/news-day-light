import axios from "axios";

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: `${import.meta.env.VITE_local_server}`,
    })
    return axiosSecure;
};

export default useAxiosSecure;