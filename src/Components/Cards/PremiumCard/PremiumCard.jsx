import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const PremiumCard = ({ article }) => {

    const {subscribed} = useAuth();

    return (
        <div>
            <div className="card card-compact w-full shadow-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 text-white border border-yellow-400">
                <figure className="p-4">
                    <img
                        className="rounded-lg shadow-lg w-full h-56 object-cover border border-yellow-300"
                        src={article?.articleImage}
                        alt="Premium Article"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-yellow-300 text-lg font-bold">
                        {article?.articleTitle || "Premium Article Title"}
                    </h2>
                    <p className="text-sm font-medium mb-2">
                        Publisher: {article?.publisher || "Publisher Name"}
                    </p>
                    <p className="text-sm font-light">
                        {article?.articleDescription?.substring(0, 50) || 
                        "A brief description of the premium article..."}...
                    </p>
                    <div className="card-actions justify-end mt-4">
                        <Link to={subscribed ?`/article-details/${article?._id}` : '/subscription'}>
                            <button className="btn bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold shadow-md border-none">
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

PremiumCard.propTypes = {
    article: PropTypes.object,
};

export default PremiumCard;
