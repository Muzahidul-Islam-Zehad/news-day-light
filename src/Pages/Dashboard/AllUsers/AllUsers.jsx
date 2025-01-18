import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-users');
            return data;
        }
    });

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
                    const { data } = await axiosSecure.patch(`/make-admin/${id}`);
                    console.log(data);
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

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            <div>
                <PageHeading title='All users' subtitle='All users of this application'></PageHeading>
            </div>
            <div>
                <div className="overflow-x-auto w-full p-6">
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
                                allUsers.map((user, idx) =>
                                    <tr key={user._id} className="hover:bg-gray-100 border-t">
                                        <td className="py-3 px-4">{idx + 1}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <img
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
                                                    <button onClick={() => handleUpdateToAdmin(user._id)} className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2">
                                                        Make Admin
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
        </div>
    );
};

export default AllUsers;