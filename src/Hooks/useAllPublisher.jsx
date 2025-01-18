import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllPublisher = () => {
    const axiosSecure = useAxiosSecure();

    const {data : publishers = [] , isLoading} = useQuery({
        queryKey:['publisher-data'],
        queryFn: async() =>{
            const {data} = await axiosSecure.get('/publisher-data');
            return data;
        }
    });
    return [publishers, isLoading]
};

export default useAllPublisher;