import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import UpdateModal from "./UpdateUserProfileModal";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const UserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['user-data', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user.email}`);
            return data
        }
    })

    if(isLoading)
    {
        return <LoadingSpinner></LoadingSpinner>
    }

    // console.log(data);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="border border-gray-300 shadow-lg rounded-lg w-11/12 md:w-3/4 lg:w-1/2 mx-auto py-6 px-8 bg-white">
                <div className="avatar flex justify-center">
                    <div className="ring-primary ring-offset-base-100 w-28 rounded-full ring ring-offset-2 overflow-hidden">
                        <img src={data?.photoURL} alt="Profile" />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <p className="btn btn-sm text-center bg-blue-100 text-blue-700 rounded-full px-6 py-2">
                        ID: {data?._id}
                    </p>
                </div>
                <div className="text-center mt-8">
                    <h1 className="text-2xl font-extrabold text-gray-800">Name: {data?.name}</h1>
                    <h2 className="text-lg text-gray-600 mt-2">Email: {data?.email}</h2>
                </div>
                <div className="mt-10">
                    <button onClick={()=>setIsModalOpen(true)} className="btn w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                        Update Profile
                    </button>
                </div>
            </div>
            <UpdateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentUser={data}
                refetch={refetch}
            />
        </div>

    );
};

export default UserProfile;