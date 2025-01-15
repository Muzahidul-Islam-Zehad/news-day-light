import axios from "axios";

const useAxiosPublic = () => {

    const axiosPublic = axios.create({
        baseURL: `${import.meta.env.VITE_local_server}`,
    })

    return axiosPublic
};

export default useAxiosPublic;