import Swal from "sweetalert2";
import PageHeading from "../../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { imageUploadToImageBB } from "../../../Utilities/UploadImageOnImageBB";
import { useState } from "react";
import { BsBrightnessHighFill } from "react-icons/bs";

const AddPublisher = () => {
    const [loading, setLoading]=useState(false);
    const axiosSecure = useAxiosSecure();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const publisherName = form.name.value;
        const givenLogo = form.logo.files[0];

        try {
            const logo = await imageUploadToImageBB(givenLogo);

            // console.log(logo);

            const publisherData = { publisherName, logo };

            form.reset();

            await axiosSecure.post('/add-publishers', publisherData);
            Swal.fire({
                title: "Added",
                text: "Publisher added",
                icon: "success"
            });
        }
        catch (err) {
            console.log(err);
        }
        finally
        {
            setLoading(false);
        }


        // console.log(data);
    }

    return (
        <div>
            <div>
                <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                    <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg p-6 dark:bg-gray-800">
                        <div className="mb-8"><PageHeading title='Add publisher' subtitle='Add new publisher here'></PageHeading></div>
                        <form onSubmit={handleSubmit}>
                            {/* Publisher Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="publisherName"
                                    className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
                                >
                                    Publisher Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    id="publisherName"
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter publisher name"
                                    required
                                />
                            </div>

                            {/* Publisher Logo */}
                            <div className="mb-6">
                                <label
                                    htmlFor="publisherLogo"
                                    className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
                                >
                                    Publisher Logo
                                </label>
                                <input
                                    name="logo"
                                    type="file"
                                    id="publisherLogo"
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                    accept="image/*"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {
                                    loading
                                    ?
                                    <span className="text-xl animate-spin"><BsBrightnessHighFill /></span>
                                    :
                                    'Submit'
                                }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

{/* <div className="form-control mt-6">
    <button disabled={registerLoading || loading} className="btn bg-[#003366] text-white hover:bg-[#002B55]">{
        registerLoading ?
            <span className="text-xl animate-spin"><BsBrightnessHighFill /></span>
            :
            'Register'
    }</button>
</div> */}
export default AddPublisher;