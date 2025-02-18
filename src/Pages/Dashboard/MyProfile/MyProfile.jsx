import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaBirthdayCake, FaUser } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
const MyProfile = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['user-data', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user.email}`);
            return data
        }
    });

    console.log(data);

    if(isLoading)
        {
            return <LoadingSpinner></LoadingSpinner>
        }

    return (
        <div className=" bg-gray-100">
            {/* Banner Section */}
            <div className="relative w-full h-60 bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <img
                        src={data?.photoURL}
                        alt="User Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                </div>
            </div>

            {/* Profile Details Section */}
            <div className="max-w-5xl mx-auto mt-20 p-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">{data?.name}</h1>
                    <p className="text-gray-500 text-lg">{data?.role ? "Admin" : data?.premiumEndAt === null ? 'Normal User': 'Premium User'}</p>
                </div>

                {/* Profile Info Grid */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 shadow-md rounded-lg">
                    {/* Left Side */}
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-700 text-lg">
                            <FaUser className="text-blue-500 mr-3" />
                            <span>Full Name: <span className="font-semibold">{data?.name}</span></span>
                        </div>
                        <div className="flex items-center text-gray-700 text-lg">
                            <FaEnvelope className="text-red-500 mr-3" />
                            <span>Email: <span className="font-semibold">{data.email}</span></span>
                        </div>
                        <div className="flex items-center text-gray-700 text-lg">
                            <FaPhone className="text-green-500 mr-3" />
                            <span>Phone: <span className="font-semibold">{data?.phone? data.phone: 'N/A'}</span></span>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-700 text-lg">
                            <FaMapMarkerAlt className="text-purple-500 mr-3" />
                            <span>Address: <span className="font-semibold">{data?.address? data.address: 'N/A'}</span></span>
                        </div>
                        <div className="flex items-center text-gray-700 text-lg">
                            <FaBirthdayCake className="text-yellow-500 mr-3" />
                            <span>Date of Birth: <span className="font-semibold">{data?.birth? data.birth: 'N/A'}</span></span>
                        </div>
                        <div className="flex items-center text-gray-700 text-lg">
                            <FaUser className="text-indigo-500 mr-3" />
                            <span>Gender: <span className="font-semibold">{data?.gender? data.gender: 'N/A'}</span></span>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className="mt-8 flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 text-lg shadow-md transition">
                        <FaEdit />
                        <span>Edit Profile</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;