import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { format } from "date-fns";
import { useState } from "react";
import Swal from "sweetalert2";
import DeclineModal from "./DeclineModal/DeclineModal";

const AllArticlesAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [decliningId, setDecliningId] = useState('');

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setDecliningId('');
    }

    const { data: allArticle = [], isLoading, refetch } = useQuery({
        queryKey: ['all-articles'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-articles/data')
            return data;
        }
    })

    if (isLoading || loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const handleAproveArticle = async (id) => {
        setLoading(true);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/update/status/${id}`);
                    Swal.fire({
                        title: "Approved",
                        text: "Article has approved",
                        icon: "success"
                    });
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    refetch();
                    setLoading(false);
                }
            }
        })
    }

    const handleDeclineReasonSubmit = async (reason) => {
        setLoading(true);
        const decliningReason = { decliningReason: reason };

        console.log(decliningReason);

        try {
            await axiosSecure.patch(`/article/decline/${decliningId}`, decliningReason);
            Swal.fire({
                title: "Declined",
                text: "The article has declined",
                icon: "success"
            });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            refetch();
            setLoading(false);
        }


    }

    const handleMakePremium = async (id) => {
        setLoading(true);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make it premium!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/make-premium/${id}`);
                    Swal.fire({
                        title: "Premium",
                        text: "Article is premium now",
                        icon: "success"
                    });
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    refetch();
                    setLoading(false);
                }
            }
        })
    }

    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await axiosSecure.delete(`/my-articles/${id}`);
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Article has been deleted.",
                        icon: "success"
                    });
                }
                catch (err) {
                    console.log(err);
                }

            }
        });
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
                            {/* table Row */}
                            {
                                allArticle.map((article, idx) => <tr key={article?._id} className="hover:bg-gray-100 border-t">
                                    <td className="py-3 px-4">{idx + 1}</td>
                                    <td className="py-3 px-4">{
                                        article.articleTitle.length > 40 ? article.articleTitle.substring(0,30)+'...' : article.articleTitle
                                        }</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-4">
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
                                        <button disabled={article.status === 'Approved' || article.status === 'Declined'} onClick={() => handleAproveArticle(article._id)} className="btn btn-md bg-green-500 text-white hover:bg-green-600 rounded-md px-3 py-1">
                                            Approve
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => { handleOpenModal(), setDecliningId(article._id) }} disabled={article.status === 'Approved' || article.status === 'Declined'}
                                            className="btn btn-md bg-red-500 text-white hover:bg-red-600 rounded-md px-3 py-1">
                                            Decline
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => handleDelete(article._id)} className="btn btn-md bg-blue-500 text-white hover:bg-blue-600 rounded-md px-3 py-1">
                                            Delete
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        {
                                            article.isPremium === 'Yes'
                                                ?
                                                <span>Premium</span>
                                                :

                                                <button disabled={article.status === 'Declined'} onClick={() => handleMakePremium(article._id)} className="btn btn-md bg-purple-500 text-white hover:bg-purple-600 rounded-md px-3 py-1">
                                                    Make Premium
                                                </button>
                                        }
                                    </td>

                                </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>

            </div>
            <DeclineModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleDeclineReasonSubmit}
            />

        </div>
    );
};

export default AllArticlesAdmin;