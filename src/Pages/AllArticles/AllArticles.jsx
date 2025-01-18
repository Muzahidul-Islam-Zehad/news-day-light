import { useQuery } from "@tanstack/react-query";
import NormalCard from "../../Components/Cards/NormalCard/NormalCard";
import PageHeading from "../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import PremiumCard from "../../Components/Cards/PremiumCard/PremiumCard";
import Select from "react-select";
import { useState } from "react";
import useAllPublisher from "../../Hooks/useAllPublisher";

const AllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [search, setSearch] = useState('');
    const [publicationFilter, setPublicationFiler] = useState('');
    const [publishers] = useAllPublisher();

    const { data: AllArticles = [], isLoading } = useQuery({
        queryKey: ['all-articles-approved', selectedOptions.map(o => o.value), publicationFilter, search],
        queryFn: async () => {
            const tags = selectedOptions.map(o => o.value);
            const { data } = await axiosSecure.get(`/all-articles/approved?search=${search}&publicationFiler=${publicationFilter}&tags=${tags}`);
            return data;
        }
    });

    // tags options
    const options = [
        { value: 'technology', label: 'Technology' },
        { value: 'health', label: 'Health' },
        { value: 'education', label: 'Education' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'travel', label: 'Travel' },
        { value: 'finance', label: 'Finance' },
        { value: 'sports', label: 'Sports' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'science', label: 'Science' },
        { value: 'food', label: 'Food' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'business', label: 'Business' },
        { value: 'art', label: 'Art' },
        { value: 'culture', label: 'Culture' },
        { value: 'environment', label: 'Environment' },
    ];

    // tags selection
    const handleChangeTags = (selected) => {
        setSelectedOptions(selected || []);
    };



    // if (isLoading) {
    //     return <LoadingSpinner></LoadingSpinner>
    // }
    return (
        <div className="bg-slate-200 py-10">
            <div className="w-11/12 mx-auto">
                <div>
                    <PageHeading title='all articles' subtitle='Explore every bits of news'></PageHeading>
                </div>
                <div className="flex gap-2 flex-col md:flex-row md:justify-between items-center mt-6">
                    <div className="">
                        <label className="input input-bordered flex items-center gap-2">
                            <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                    <div className="">
                        <select value={publicationFilter} onChange={(e) => { setPublicationFiler(e.target.value) }} className="select select-bordered w-full max-w-xs">
                            <option value="">All Publisher Article</option>
                            {
                                publishers.map(p => <option key={p._id}>{p.publisherName}</option>)
                            }
                            
                            <option>Greedo</option>
                        </select>
                    </div>
                    <div className="">
                        <Select
                            required
                            options={options}
                            isMulti
                            value={selectedOptions}
                            onChange={handleChangeTags}
                            placeholder="Select tags..."
                        />
                    </div>
                </div>
                {
                    isLoading
                        ?
                        <LoadingSpinner></LoadingSpinner>
                        :
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
                }
            </div>
        </div>
    );
};

export default AllArticles;