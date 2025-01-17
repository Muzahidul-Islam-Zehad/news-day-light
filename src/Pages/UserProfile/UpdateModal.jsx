
import PropTypes from "prop-types";
import { useRef, useState } from "react";

const UpdateModal = ({ isOpen, onClose, currentUser }) => {

    const [change, setChange] = useState(false);
    const fileRef = useRef(null);

    // console.log('from modal------->', currentUser);
    console.log(fileRef);
    const handleCancelFileInput = () => {
        setChange(!change);
        fileRef.current = null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pass updated data to the parent component

        onClose(); // Close modal after updating
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // value={name}
                            defaultValue={currentUser?.name}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // value={email}
                            defaultValue={currentUser?.email}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Profile Picture
                        </label>
                        {
                            change ?
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="file"
                                        ref={fileRef}
                                        className="w-full p-2 border rounded-md focus:outline-none"
                                    />
                                    <button onClick={handleCancelFileInput} type="button" className=" btn ">Cancel</button>
                                </div>
                                :
                                <div className="flex gap-2 items-center">
                                    <img className="w-10 " src={currentUser?.photoURL} alt="" />
                                    <button onClick={()=>setChange(!change)} type="button" className="btn btn-sm ">Change Image</button>
                                </div>
                        }
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UpdateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
};

export default UpdateModal;
