import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NormalCard = ({ article }) => {
    return (
        <div className="h-full">
            <div className="card card-compact w-full shadow-lg bg-gray-50 text-gray-800 border border-gray-300 h-full dark:bg-gray-800">
                <figure className="p-4 mt-4">
                    <img
                        className="rounded-lg shadow-md w-full h-56 object-cover"
                        src={article?.articleImage}
                        alt="Article Image"
                    />
                </figure>
                <div className="card-body flex flex-col justify-between h-full">
                    <div className="flex-grow">
                        <h2 className="card-title text-gray-800 text-lg font-semibold dark:text-gray-200">
                            {article?.articleTitle || "Article Title"}
                        </h2>
                        <p className="text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
                            Publisher: {article?.publisher || "Publisher Name"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {article?.articleDescription?.substring(0, 200) ||
                                "This is a brief description of the article..."}...
                        </p>
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <Link to={`/article-details/${article?._id}`}>
                            <button className="btn btn-outline font-semibold border shadow-sm dark:text-white dark:hover:bg-gray-600">
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

NormalCard.propTypes = {
    article: PropTypes.object,
};

export default NormalCard;
