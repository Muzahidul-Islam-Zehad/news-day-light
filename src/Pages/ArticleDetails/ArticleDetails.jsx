import { useParams } from "react-router-dom";
import PageHeading from "../../Components/SharedComponents/PageHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";

const ArticleDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const updateView = async () => {
            try {
                await axiosSecure.patch(`/articles/view-count/${id}`)
            }
            catch (err) {
                console.log(err);
            }
        }
        updateView();
    }, [])

    const { data, isLoading } = useQuery({
        queryKey: ['article-data', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/article/data/${id}`)
            return data;
        }
    });

    // update view count


    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="w-11/12 md:w-5/6 lg:w-3/5 mx-auto my-6">
            <div>
                <PageHeading></PageHeading>
            </div>
            <div className="p-4 border border-slate-300 rounded-2xl">
                <img className="w-full border h-[500px] object-contain bg-slate-100 rounded-xl" src={data?.articleImage} alt="article-image" />
                <h1 className="uppercase text-4xl font-bold mt-2">{data?.articleTitle}</h1>
                <h3 className="hover:bg-green-300 cursor-default mt-2 text-xl font-medium bg-green-300 text-blue-600 rounded-full btn btn-sm">Publisher : {data?.publisher}</h3>
                <p className="mt-6 text-lg">{data?.articleDescription}</p>
            </div>
        </div>
    );
};

export default ArticleDetails;