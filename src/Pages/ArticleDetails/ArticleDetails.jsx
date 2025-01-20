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
                <PageHeading />
            </div>
            <div className="p-6 border border-gray-300 rounded-3xl shadow-lg bg-white">
                <img
                    className="w-full h-[500px] object-cover bg-slate-100 rounded-xl shadow-md"
                    src={data?.articleImage}
                    alt="article-image"
                />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-4 text-gray-800">{data?.articleTitle}</h1>
                <h3 className="mt-4 text-lg sm:text-xl font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 rounded-full w-max">
                    Publisher: {data?.publisher}
                </h3>
                <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">{data?.articleDescription}</p>
            </div>
        </div>

    );
};

export default ArticleDetails;