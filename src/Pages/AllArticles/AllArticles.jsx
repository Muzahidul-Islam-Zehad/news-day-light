import { useQuery } from "@tanstack/react-query";
import NormalCard from "../../Components/Cards/NormalCard/NormalCard";
import PageHeading from "../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import PremiumCard from "../../Components/Cards/PremiumCard/PremiumCard";

const AllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { data: AllArticles = [], isLoading } = useQuery({
        queryKey: ['all-articles-approved'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-articles/approved');
            return data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="bg-slate-200 py-10">
            <div className="w-11/12 mx-auto">
                <div>
                    <PageHeading title='all articles' subtitle='Explore every bits of news'></PageHeading>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {

                        AllArticles.map(article => {

                            if (article.isPremium === 'No') {
                                return <NormalCard key={article._id} article={article}></NormalCard>
                            }
                            return <PremiumCard key={article._id} article={article}></PremiumCard>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default AllArticles;