import { useQuery } from "@tanstack/react-query";
import PremiumCard from "../../Components/Cards/PremiumCard/PremiumCard";
import PageHeading from "../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: premiumArticles = [], isLoading } = useQuery({
        queryKey: ['premium-articles-only'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/premium/articles/only');
            return data;
        }
    });

    console.log(premiumArticles);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="bg-slate-200 py-6">
            <div className="w-11/12 mx-auto ">
                <div>
                    <PageHeading title='premium articles' subtitle='Find your premium articles'></PageHeading>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {
                        premiumArticles.map(article => <PremiumCard key={article._id} article={article}></PremiumCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default PremiumArticles;