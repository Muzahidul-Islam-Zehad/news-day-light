
import PropTypes from "prop-types";
// import { BsBrightnessHighFill } from "react-icons/bs";
import Select from "react-select";
import { imageNameShorter } from "../../Utilities/ImageNameShorter";
import { useEffect, useRef, useState } from "react";
import { imageUploadToImageBB } from "../../Utilities/UploadImageOnImageBB";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { BsBrightnessHighFill } from "react-icons/bs";
import useAllPublisher from "../../Hooks/useAllPublisher";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";

const UpdateArticleModal = ({ isOpen, onClose, article, refetch }) => {

    const [photoName, setPhotoName] = useState(null);
    const [change, setChange] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const fileInputRef = useRef(null);
    const axiosSecure = useAxiosSecure();
    const [articleLoading, setArticleLoading] = useState(false);
    const [publishers, isLoading] = useAllPublisher();
    const [modifiedTagss, setModifiedTagss] = useState([]);
    const {darkMode} = useAuth();

    useEffect(() => {

        // if (article) {
        // }
        const modifiedTags = Array.isArray(article?.Tags)
        ? article.Tags.map(tag => ({
            value: tag,
            label: tag,
        }))
        : [];
        // console.log(modifiedTags);
        setModifiedTagss(modifiedTags);


        if (!isOpen) {
            setSelectedOptions(modifiedTags || []);
            setChange(false);

        }



    }, [isOpen, article]);

    if (!isOpen) return null;

    //tags in array conversion.

    if(isLoading)
    {
        return <LoadingSpinner></LoadingSpinner>
    }
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
          backgroundColor: darkMode ? "#1F2937" : "#ffffff", // bg-gray-700 in dark mode
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
      


    const handleImageUpload = (e) => {
        const imageName = imageNameShorter(e.target.files);
        setPhotoName(imageName);
    };

    const handleChangeImage = () => {
        // e.preventDefault();
        setChange(!change);
        setPhotoName(null);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleTagChange = (selected) => {
        setSelectedOptions(selected);
    }


    const handleUpdate = async (e, id) => {
        e.preventDefault();
        setArticleLoading(true);

        const form = e.target;
        const title = form.title.value;
        // const image = form.image.files[0];
        const publisher = form.publisher.value;
        const description = form.description.value;
        const image = form?.image?.files[0];

        let photoURL = article.articleImage;

        if (image) {
            try {
                photoURL = await imageUploadToImageBB(image);
            }
            catch (err) {
                console.log(err);
                setArticleLoading(false);
                return ;
            }
        }

        const formatedTags = selectedOptions.map(select => select.value);
        // console.log('fomatedTags' ,formatedTags);

        const updatedArticle = { title, publisher, description, formatedTags, photoURL };

        try {
            await axiosSecure.patch(`/my-articles/update/${id}`, updatedArticle);
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
            setArticleLoading(false);
            refetch();
            onClose();
        }

        // console.log({ title, publisher, description, selectedOptions, photoURL });

        // console.log('handle update of articles', id);

    }

    return (
        <td>
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white max-w-2xl w-full mx-4 rounded-lg shadow-lg overflow-hidden dark:bg-gray-900">
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold dark:text-gray-200">Update Article</h2>
                        <button
                            className="text-gray-500 text-xl dark:text-gray-200 hover:text-gray-700"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="p-6">
                        {/* Form */}
                        <form onSubmit={(e) => handleUpdate(e, article._id)}>
                            {/* Title */}
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={article.articleTitle}
                                    placeholder="Enter article title"
                                    className="input input-bordered focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] w-full mt-2 bg-[#F9FAFB] dark:bg-gray-800 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Publisher */}
                            <div className="mb-4">
                                <label htmlFor="publisher" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Publisher
                                </label>
                                <select
                                    id="publisher"
                                    name="publisher"
                                    defaultValue={article.publisher}
                                    className="select select-bordered w-full mt-2 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] bg-[#F9FAFB] dark:bg-gray-800 dark:text-white"
                                    required
                                >
                                    <option value="">Select Publisher</option>
                                    {
                                        publishers.map(publisher => <option key={publisher._id} value={publisher.publisherName}>{publisher.publisherName}</option>)
                                    }
                                </select>
                            </div>

                            {/* Tags */}
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Tags
                                </label>
                                <Select
                                    options={options}
                                    name="tags"
                                    isMulti
                                    defaultValue={modifiedTagss.map(tag => tag)}
                                    value={selectedOptions}
                                    onChange={handleTagChange}
                                    placeholder="Select tags..."
                                    styles={customStyles}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    defaultValue={article.articleDescription}
                                    placeholder="Enter article description"
                                    className="textarea textarea-bordered w-full mt-2 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] bg-[#F9FAFB] dark:bg-gray-800 dark:text-white"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            {/* Image File */}
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 mb-2 dark:text-gray-300">
                                    Upload Image
                                </label>
                                <div>
                                    {!change ? (
                                        <div className="flex gap-4 items-center">
                                            <img src={article.articleImage} alt="article-image" className="w-16" />
                                            <button
                                                type="button"
                                                onClick={handleChangeImage}
                                                className="btn"
                                            >
                                                Change Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4">
                                            <label className="text-center border border-dashed hover:cursor-pointer border-gray-400 p-3 rounded-md bg-[#F9FAFB] w-full dark:bg-gray-800 dark:text-white">
                                                {photoName ? photoName : "Choose A Photo"}
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    ref={fileInputRef} // Attach ref to the input
                                                    onChange={handleImageUpload}
                                                    hidden
                                                />
                                            </label>
                                            <button
                                                onClick={handleChangeImage}
                                                className="btn"
                                                type="button"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Error Message */}
                            {/* {errMsg && (
                            <p className="text-sm font-bold text-red-600 animate-bounce">
                                Select an image
                            </p>
                        )} */}

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    disabled={articleLoading}
                                    type="submit"
                                    className="btn btn-primary px-6 py-2 text-white"
                                >
                                    {articleLoading ? (
                                        <span className="text-xl animate-spin">
                                            <BsBrightnessHighFill />
                                        </span>
                                    ) : (
                                        "Update Article"
                                    )}


                                </button>
                                {/* <input type="text" /> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </td>
    );
};

UpdateArticleModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    article: PropTypes.object,
    refetch: PropTypes.func
}

export default UpdateArticleModal;
