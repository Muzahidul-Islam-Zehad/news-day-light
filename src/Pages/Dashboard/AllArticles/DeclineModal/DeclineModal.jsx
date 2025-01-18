import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const DeclineModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("");

    useEffect(()=>{
        if(!isOpen)
        {
            setReason("");
        }
    },[isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(reason); 
        setReason(""); 
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Decline Article
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="reason"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Reason for Decline
                        </label>
                        <textarea
                            id="reason"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            rows="4"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Write the reason for declining the article..."
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Post Reason
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

DeclineModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default DeclineModal;
