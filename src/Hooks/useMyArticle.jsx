import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyArticle = () => {

    
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data : myArticleData , isLoading, refetch } = useQuery({
        queryKey : ['my-articles', user?.email],
        enabled: !!user?.email,
        queryFn : async() =>{
            const response = await axiosSecure.get(`/articles/${user?.email}`);
            return response.data;
        }
    });

    return [myArticleData, isLoading, refetch];
};

export default useMyArticle;