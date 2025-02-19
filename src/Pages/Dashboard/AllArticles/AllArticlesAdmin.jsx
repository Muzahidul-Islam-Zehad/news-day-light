import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { format } from "date-fns";
import { useState } from "react";
import Swal from "sweetalert2";
import DeclineModal from "./DeclineModal/DeclineModal";
import ReactPaginate from "react-paginate";

const AllArticlesAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [decliningId, setDecliningId] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(5);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setDecliningId('');
    }

    const { data: allArticle = [], isLoading, refetch } = useQuery({
        queryKey: ['all-articles', currentPage, limit],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-articles/data?limit=${limit}&page=${currentPage + 1}`)
            return data;
        }
    })

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    // if (isLoading || loading) {
    //     return <LoadingSpinner></LoadingSpinner>
    // }

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

        // console.log(decliningReason);

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
        setLoading(false);
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


    // console.log(allArticle);
    return (
        <div>
            <div>
                <PageHeading title='All articles' subtitle='All articles user made'></PageHeading>
            </div>
            <div>
                <div className="overflow-x-auto w-full p-6">
                    {
                        isLoading || loading ? <LoadingSpinner></LoadingSpinner>
                            :
                            <table className="table w-full border border-gray-300 rounded-lg shadow-md">
                                {/* Table Head */}
                                <thead className="bg-gray-200 dark:bg-[#003366] dark:text-white">
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
                                        allArticle?.articles.map((article, idx) => <tr key={article?._id} className=" border-t dark:text-gray-200">
                                            <td className="py-3 px-4">{idx + 1}</td>
                                            <td className="py-3 px-4">{
                                                article.articleTitle.length > 40 ? article.articleTitle.substring(0, 30) + '...' : article.articleTitle
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
                                            <td className="py-3 px-4 dark:text-black">
                                                <span className={`${status === 'Pending' && 'bg-yellow-200 px-4 py-1 rounded-3xl'} ${article?.status === 'Accepted' && 'bg-green-200 px-4 py-1 rounded-3xl'
                                                    } ${article?.status === 'Declined' &&
                                                    'bg-red-200 px-4 py-1 rounded-3xl cursor-pointer'
                                                    } ${article?.status === 'Approved' && 'bg-lime-200 px-4 py-1 rounded-3xl'}`}>
                                                    {article?.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">{article.publisher}</td>
                                            <td className="py-3 px-4">
                                                <button disabled={article.status === 'Approved' || article.status === 'Declined'} onClick={() => handleAproveArticle(article._id)} className="btn btn-md bg-green-500 text-white hover:bg-green-600 rounded-md px-3 py-1 disabled:bg-gray-400 disabled:text-white">
                                                    Approve
                                                </button>
                                            </td>
                                            <td className="py-3 px-4">
                                                <button onClick={() => { handleOpenModal(), setDecliningId(article._id) }} disabled={article.status === 'Approved' || article.status === 'Declined'}
                                                    className="btn btn-md bg-red-500 text-white hover:bg-red-600 rounded-md px-3 py-1 disabled:bg-gray-400 disabled:text-white">
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

                                                        <button disabled={article.status === 'Declined'} onClick={() => handleMakePremium(article._id)} className="btn btn-md bg-purple-500 text-white hover:bg-purple-600 rounded-md px-3 py-1 ">
                                                            Make Premium
                                                        </button>
                                                }
                                            </td>

                                        </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                    }
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center gap-4">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={allArticle?.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName="flex items-center justify-center space-x-2 mt-4"

                        pageClassName="px-3 py-1 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
                        pageLinkClassName="text-gray-700 dark:text-white"

                        activeClassName="bg-blue-500 text-white"
                        activeLinkClassName="font-bold text-white"

                        previousClassName="px-3 py-1 border border-gray-300 rounded transition hover:bg-blue-500"
                        previousLinkClassName="text-gray-700 dark:text-white hover:text-white"

                        nextClassName="px-3 py-1 border border-gray-300 rounded transition hover:bg-blue-500"
                        nextLinkClassName="text-gray-700 dark:text-white hover:text-white"

                        breakClassName="px-3 py-1"
                        breakLinkClassName="text-gray-700"

                        disabledClassName="opacity-50 cursor-not-allowed"
                    />

                    <div className="flex  gap-4">
                        <p>Select Limit : </p>
                        <select value={limit} onChange={((e) => { setLimit(e.target.value), setCurrentPage(0) })} className="select select-bordered w-full max-w-xs">
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
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