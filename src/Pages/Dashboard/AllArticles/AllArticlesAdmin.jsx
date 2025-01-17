import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import {format} from "date-fns";

const AllArticlesAdmin = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allArticle = [], isLoading, refetch } = useQuery({
        queryKey: ['all-articles'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-articles/data')
            return data;
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    console.log(allArticle);
    return (
        <div>
            <div>
                <PageHeading title='All articles' subtitle='All articles user made'></PageHeading>
            </div>
            <div>
                <div className="overflow-x-auto w-full p-6">
                    <table className="table w-full border border-gray-300 rounded-lg shadow-md">
                        {/* Table Head */}
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left">#</th>
                                <th className="py-3 px-4 text-left">Article Title</th>
                                <th className="py-3 px-4 text-left">Author</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Posted Date</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Publisher</th>
                                <th className="py-3 px-4 text-left">Approve</th>
                                <th className="py-3 px-4 text-left">Decline</th>
                                <th className="py-3 px-4 text-left">Delete</th>
                                <th className="py-3 px-4 text-left">Make Premium</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {/* Mock Row */}
                            {
                                allArticle.map((article, idx) => <tr key={article?._id} className="hover:bg-gray-100 border-t">
                                    <td className="py-3 px-4">{idx+1}</td>
                                    <td className="py-3 px-4">{article?.articleTitle}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                <img
                                                    src={article?.userInfo?.image}
                                                    alt="Author"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <span>{article?.userInfo?.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{article?.userInfo?.email}</td>
                                    <td className="py-3 px-4">{format(new Date(article?.createdAt), 'PPPP')}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-3 py-1 text-white rounded-md bg-yellow-500">
                                            {article?.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{article.publisher}</td>
                                    <td className="py-3 px-4">
                                        <button className="btn btn-md bg-green-500 text-white hover:bg-green-600 rounded-md px-3 py-1">
                                            Approve
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="btn btn-md bg-red-500 text-white hover:bg-red-600 rounded-md px-3 py-1">
                                            Decline
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="btn btn-md bg-blue-500 text-white hover:bg-blue-600 rounded-md px-3 py-1">
                                            Delete
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="btn btn-md bg-purple-500 text-white hover:bg-purple-600 rounded-md px-3 py-1">
                                            Make Premium
                                        </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AllArticlesAdmin;