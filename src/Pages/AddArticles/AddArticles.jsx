import { useState } from "react";
import PageHeading from "../../Components/SharedComponents/PageHeading";
import { imageNameShorter } from "../../Utilities/ImageNameShorter";
import Select from "react-select";
import { imageUploadToImageBB } from "../../Utilities/UploadImageOnImageBB";
import useAuth from "../../Hooks/useAuth";
import { BsBrightnessHighFill } from "react-icons/bs";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import useAllPublisher from "../../Hooks/useAllPublisher";

const AddArticles = () => {
    const [photoName, setPhotoName] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [errMsg, setErrMsg] = useState(null);
    const { user, darkMode } = useAuth();
    const [articleLoading, setArticleLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [publishers, isLoading] = useAllPublisher();
    // const {data : publishers = [] , isLoading} = useQuery({
    //     queryKey:['publisher-data'],
    //     queryFn: async() =>{
    //         const {data} = await axiosSecure.get('/publisher-data');
    //         return data;
    //     }
    // });


    // tags options
    const options = [
        { value: 'technology', label: 'Technology' },
        { value: 'health', label: 'Health' },
        { value: 'education', label: 'Education' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'travel', label: 'Travel' },
        { value: 'finance', label: 'Finance' },
        { value: 'sports', label: 'Sports' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'science', label: 'Science' },
        { value: 'food', label: 'Food' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'business', label: 'Business' },
        { value: 'art', label: 'Art' },
        { value: 'culture', label: 'Culture' },
        { value: 'environment', label: 'Environment' },
    ];

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: darkMode ? "#374151" : "#ffffff", // bg-gray-700 in dark mode
          borderColor: state.isFocused ? (darkMode ? "#3B82F6" : "#2563EB") : "#D1D5DB",
          color: darkMode ? "#ffffff" : "#000000",
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: darkMode ? "#374151" : "#ffffff", // bg-gray-700 in dark mode
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? (darkMode ? "#4B5563" : "#E5E7EB") : "transparent", // Slightly lighter shade for hover
          color: darkMode ? "#ffffff" : "#000000",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: darkMode ? "#ffffff" : "#000000",
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: darkMode ? "#4B5563" : "#E5E7EB", // Multi-value background
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: darkMode ? "#ffffff" : "#000000",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: darkMode ? "#ffffff" : "#000000",
          ":hover": {
            backgroundColor: darkMode ? "#DC2626" : "#EF4444",
            color: "#ffffff",
          },
        }),
      };
      



    // tags selection
    const handleChangeTags = (selected) => {
        setSelectedOptions(selected);
    };

    //   console.log('selected tags : ', selectedOptions);

    // submit add article form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg(null);
        setArticleLoading(true);

        const form = e.target;
        const title = form.title.value;
        const image = form.image.files[0];
        const publisher = form.publisher.value;
        const description = form.description.value;

        if (!image) {
            setErrMsg('Select an image first');
            setArticleLoading(false)
            return;
        }

        const photoURL = await imageUploadToImageBB(image);

        const formatedTags = selectedOptions.map(select => select.value);

        const articleInfo = {
            title,
            photoURL,
            publisher,
            formatedTags,
            description,
            userInfo: {
                email: user.email,
                name: user.displayName,
                image: user.photoURL
            }
        }

        try {
            const { data } = await axiosSecure.post(`/articles?email=${user.email}`, articleInfo);
            if (data?.message === 'needPremium') {
                Swal.fire({
                    title: "Need Premium",
                    text: "You have reached maximum post of free plan",
                    icon: "error"
                });
            }
            else {
                Swal.fire({
                    title: "Submited",
                    text: "Your article has been submited",
                    icon: "success"
                });
                navigate('/my-articles')
            }

        }
        catch (err) {
            console.log(err);
        }

        // console.log(articleInfo);
        // console.log("Form submitted");

        setArticleLoading(false);
    };

    const handleImageUpload = (e) => {
        const imageName = imageNameShorter(e.target.files);
        // console.log(imageName);
        setPhotoName(imageName);
    }
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="bg-[#F4F6F8] dark:bg-gray-900 py-6">
            <div>
                <PageHeading title=' add article' subtitle='Post your creative article'></PageHeading>
            </div>
            <div className="my-4 ">
                <form
                    className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md dark:bg-gray-800"
                    onSubmit={handleSubmit}
                >
                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-400">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter article title"
                            className="input input-bordered focus:ring-2 focus:ring-[#00B4D8] foucs:outline-none focus:border-[#00B4D8] w-full mt-2 bg-[#F9FAFB] dark:bg-gray-700 dark:text-white"

                            required
                        />
                    </div>

                    {/* Image File */}
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700 mb-2 dark:text-gray-400">
                            Upload Image
                        </label>
                        <label className=" label text-center border border-dashed hover:cursor-pointer border-gray-400 p-3 rounded-md bg-[#F9FAFB] w-full dark:bg-gray-700 dark:text-gray-400">
                            {
                                photoName ? <span>{photoName}</span> : <span>Choose A Photo</span>
                            }
                            <input className="" onChange={handleImageUpload} hidden type="file" name="image" id="image" />
                        </label>
                    </div>



                    {/* Publisher */}
                    <div className="mb-4">
                        <label htmlFor="publisher" className="block text-lg font-medium text-gray-700 dark:text-gray-400">
                            Publisher
                        </label>
                        <select
                            id="publisher"
                            name="publisher"
                            defaultValue=""
                            className="select select-bordered w-full mt-2  focus:ring-2 focus:ring-[#00B4D8] foucs:outline-none focus:border-[#00B4D8] bg-[#F9FAFB] dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option disabled value="">Select Publisher</option>
                            {
                                publishers.map(publisher => <option key={publisher._id} value={publisher.publisherName}>{publisher.publisherName}</option>)
                            }
                            {/* <option value="publisher 2">Publisher 2</option>
                            <option value="publisher 3">Publisher 3</option> */}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-400 ">
                            Tags
                        </label>
                        <Select
                            required
                            options={options}
                            isMulti
                            value={selectedOptions}
                            onChange={handleChangeTags}
                            placeholder="Select tags..."
                            styles={customStyles}
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700 dark:text-gray-400">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter article description"
                            className="textarea textarea-bordered w-full mt-2  focus:ring-2 focus:ring-[#00B4D8] foucs:outline-none focus:border-[#00B4D8] bg-[#F9FAFB] dark:bg-gray-700 dark:text-white"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    {/* error msg*/}
                    {
                        errMsg && <p className="text-sm font-bold text-red-600 animate-bounce">Select an image</p>
                    }

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            disabled={articleLoading}
                            type="submit"
                            className="btn btn-primary px-6 py-2 text-white"
                        >
                            {
                                articleLoading ?
                                    <span className="text-xl animate-spin"><BsBrightnessHighFill /></span>
                                    :
                                    'Submit Article'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArticles;