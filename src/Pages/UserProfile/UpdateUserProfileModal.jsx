
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { imageUploadToImageBB } from "../../Utilities/UploadImageOnImageBB";
import Swal from "sweetalert2";
import { BsBrightnessHighFill } from "react-icons/bs";

const UpdateUserProfileModal = ({ isOpen, onClose, currentUser, refetch }) => {

    const [change, setChange] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const fileRef = useRef(null);
    const axiosSecure = useAxiosSecure();
    const { user, updateUserProfile, setLoading } = useAuth();

    useEffect(() => {
        if (!isOpen) {
            setUpdateLoading(false);
            setChange(false);
        }
    }, [isOpen]);

    // console.log('from modal------->', currentUser);
    // console.log(fileRef);
    if (!isOpen) return null;


    const handleCancelFileInput = () => {
        setChange(!change);
        fileRef.current = null;
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);

        // Pass updated data to the parent component

        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const birth = form.birth.value;
        const gender = form.gender.value;
        const image = form.image?.files[0] || null;

        let photoURL = currentUser?.photoURL;

        

        if (image) {
            try {
                photoURL = await imageUploadToImageBB(image);
            }
            catch (err) {
                console.log(err);
                // setArticleLoading(false);
                setUpdateLoading(false);
                return;
            }
        }

        const updatedData = { name, photoURL, phone, address, birth, gender };

        try {
            await axiosSecure.patch(`/users/${user.email}`, updatedData);

            await updateUserProfile(updatedData);
            setLoading(false);

            Swal.fire({
                title: "Updated",
                text: "Your article has been Updataed",
                icon: "success"
            });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            refetch();
            setUpdateLoading(false);
            onClose();
        }

         // Close modal after updating
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 dark:bg-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center dark:text-gray-200">Update Profile</h2>
                <form onSubmit={handleUpdateSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
                            Email <span className="text-slate-400">(read only)</span>
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            // value={email}
                            defaultValue={currentUser?.email}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            // value={name}
                            name="name"
                            defaultValue={currentUser?.name}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
                            Phone
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            // value={name}
                            name="phone"
                            defaultValue={currentUser?.phone}
                            
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
                            Address
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            // value={name}
                            name="address"
                            defaultValue={currentUser?.address}
                            
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
                            Date of birth
                        </label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            // value={name}
                            name="birth"
                            defaultValue={currentUser?.birth}
                            
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
                            Gender 
                        </label>
                        <select defaultValue={currentUser?.gender} name="gender" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
                            Profile Picture
                        </label>
                        {
                            change ?
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="file"
                                        ref={fileRef}
                                        name="image"
                                        className="w-full p-2 border rounded-md focus:outline-none dark:text-white"
                                    />
                                    <button disabled={updateLoading} onClick={handleCancelFileInput} type="button" className=" btn ">Cancel</button>
                                </div>
                                :
                                <div className="flex gap-2 items-center">
                                    <img className="w-10 " src={currentUser?.photoURL} alt="" />
                                    <button disabled={updateLoading} onClick={() => setChange(!change)} type="button" className="btn btn-sm ">Change Image</button>
                                </div>
                        }
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            disabled={updateLoading}
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={updateLoading}
                            type="submit"
                            className="btn btn-primary px-6 py-2 text-white"
                        >
                            {updateLoading ? (
                                <span className="text-xl animate-spin dark:text-white">
                                    <BsBrightnessHighFill />
                                </span>
                            ) : (
                                "Update Profile"
                            )}


                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UpdateUserProfileModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    refetch: PropTypes.func,
    currentUser: PropTypes.object,
};

export default UpdateUserProfileModal;
