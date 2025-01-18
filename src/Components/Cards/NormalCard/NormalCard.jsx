import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NormalCard = ({ article }) => {
    return (
        <div>
            <div className="card card-compact w-full shadow-lg bg-gray-50 text-gray-800 border border-gray-300">
                <figure className="p-4">
                    <img
                        className="rounded-lg shadow-md w-full h-56 object-cover"
                        src={article?.articleImage}
                        alt="Article Image"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-gray-800 text-lg font-semibold truncate">
                        {article?.articleTitle || "Article Title"}
                    </h2>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                        Publisher: {article?.publisher || "Publisher Name"}
                    </p>
                    <p className="text-sm text-gray-500">
                        {article?.articleDescription?.substring(0, 50) ||
                            "This is a brief description of the article..."}...
                    </p>
                    <div className="card-actions justify-end mt-4">
                        <Link to={`/article-details/${article?._id}`}>
                            <button className="btn bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold border border-gray-300 shadow-sm">
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
