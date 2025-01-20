import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import UpdateArticleModal from "./UpdateArticleModal";

const TableRow = ({ article, idx, handleDelete, refetch }) => {
    const { articleTitle, status, isPremium, _id } = article || {};

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDecliningModalOpen, setIsDecliningModalOpen] = useState(false);
    const [decliningReason, setDecliningReason] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        refetch();
    };

    const openDecliningReasonModal = () => setIsDecliningModalOpen(true);
    const closeDecliningReasonModal = () => setIsDecliningModalOpen(false);

    const handleSeeDeclineReason = () => {
        if (article.decliningReason) {
            setDecliningReason(article.decliningReason);
            openDecliningReasonModal();
        }
    };

    return (
        <tr className="hover font-medium">
            <th>{idx + 1}</th>
            <td>
                {articleTitle.length > 40
                    ? articleTitle.substring(0, 30) + '...'
                    : articleTitle}
            </td>
            <td className="">
                <Link to={`/article-details/${article._id}`}>
                    <button type="button" className="btn btn-outline btn-sm btn-info">
                        Details
                    </button>
                </Link>
            </td>
            <td>
                <span
                    className={`${status === 'Pending' && 'bg-yellow-200 px-4 py-1 rounded-3xl'} ${status === 'Accepted' && 'bg-green-200 px-4 py-1 rounded-3xl'
                        } ${status === 'Declined' &&
                        'bg-red-200 px-4 py-1 rounded-3xl cursor-pointer'
                        }`}
                    onClick={status === 'Declined' ? handleSeeDeclineReason : null}
                >
                    {status}
                </span>
            </td>
            <td>{isPremium}</td>
            <td>
                <button disabled={status === 'Declined'} onClick={openModal} className="btn btn-outline btn-sm btn-accent">
                    Update
                </button>
            </td>
            <td>
                <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-outline btn-sm btn-error"
                >
                    Delete
                </button>
            </td>

            <UpdateArticleModal
                isOpen={isModalOpen}
                onClose={closeModal}
                article={article}
                refetch={refetch}
            ></UpdateArticleModal>

            {isDecliningModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white max-w-md w-full mx-4 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Declining Reason</h2>
                            <p className="text-gray-700">{decliningReason}</p>
                            <div className="mt-6 text-center">
                                <button
                                    onClick={closeDecliningReasonModal}
                                    className="btn btn-primary px-6 py-2 text-white"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </tr>
    );
};

TableRow.propTypes = {
    article: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,
};

export default TableRow;
