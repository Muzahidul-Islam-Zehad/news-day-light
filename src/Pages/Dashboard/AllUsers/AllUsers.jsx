import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(5); 

    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users', currentPage, limit],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-users?page=${currentPage + 1}&limit=${limit}`);
            return data;
        }
    });

    const handlePageClick = (event) => {
        setCurrentPage(event.selected); 
    };



    const handleUpdateToAdmin = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                     await axiosSecure.patch(`/make-admin/${id}`);
                    // console.log(data);
                    Swal.fire({
                        title: "Changed To Admin!",
                        text: "User has updated to admin",
                        icon: "success"
                    });
                }
                catch (err) {
                    console.log(err);
                    Swal.fire({
                        title: "Something Is Wrong",
                        text: "Couldn't make admin",
                        icon: "error"
                    });
                }
                finally {
                    refetch();
                }
            }
        });
    }

    // if (isLoading) {
    //     return <LoadingSpinner></LoadingSpinner>
    // }

    // console.log(allUsers.users);

    return (
        <div>
            <div>
                <PageHeading title='All users' subtitle='All users of this application'></PageHeading>
            </div>
            <div>
                <div className="overflow-x-auto w-full p-6 min-h-[400px]">
                    {
                        isLoading
                            ?
                            <LoadingSpinner></LoadingSpinner>
                            :
                            <table className="table w-full border border-gray-300 rounded-lg shadow-md">
                                {/* Table Head */}
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-3 px-4 text-left">#</th>
                                        <th className="py-3 px-4 text-left">Profile</th>
                                        <th className="py-3 px-4 text-left">Name</th>
                                        <th className="py-3 px-4 text-left">Email</th>
                                        <th className="py-3 px-4 text-left">Action</th>
                                    </tr>
                                </thead>
                                {/* Table Body */}
                                <tbody>
                                    {/* Row */}
                                    {
                                        allUsers?.users.map((user, idx) =>

                                            <tr key={user._id} className="hover:bg-gray-100 border-t">
                                                <td className="py-3 px-4">{idx + 1}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                                            <img
                                                                referrerPolicy="no-referrer"
                                                                src={user.photoURL}
                                                                alt="Profile"
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">{user.name}</td>
                                                <td className="py-3 px-4">{user.email}</td>
                                                <td className="py-3 px-4 ">
                                                    {

                                                        user?.role === 'Admin'
                                                            ?
                                                            <span className="font-bold  bg-lime-200 py-1 px-3 rounded-xl">Admin</span>
                                                            :
                                                            <button onClick={() => handleUpdateToAdmin(user._id)} className="btn btn-md bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2">
                                                                Make Admin
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

                <div className="flex flex-col items-center gap-4">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={allUsers?.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick} // Handle page click
                        containerClassName="flex items-center justify-center space-x-2 mt-4" // Overall pagination container
                        pageClassName="px-3 py-1 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition" // Page item
                        pageLinkClassName="text-gray-700" // Page link
                        activeClassName="bg-blue-500 text-white" // Active page
                        activeLinkClassName="font-bold text-white" // Active page link
                        previousClassName="px-3 py-1 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition" // Previous button
                        previousLinkClassName="text-gray-700" // Previous link
                        nextClassName="px-3 py-1 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition" // Next button
                        nextLinkClassName="text-gray-700" // Next link
                        breakClassName="px-3 py-1" // Ellipsis button
                        breakLinkClassName="text-gray-700" // Ellipsis link
                        disabledClassName="opacity-50 cursor-not-allowed" // Disabled button
                    />
                    <div className="flex  gap-4">
                        <p>Select Limit : </p>
                        <select value={limit} onChange={((e) => {setLimit(e.target.value),setCurrentPage(0)})} className="select select-bordered w-full max-w-xs">
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;