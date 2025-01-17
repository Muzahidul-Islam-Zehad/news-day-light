import PropTypes from "prop-types";
import { useState } from "react";
import UpdateModal from "./UpdateArticleModal";
import { Link } from "react-router-dom";

const TableRow = ({ article, idx, handleDelete, refetch }) => {
    const { articleTitle, status, isPremium, _id } = article || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        refetch();
    }

    return (
        <tr className="hover font-medium">
            <th>{idx + 1}</th>
            <td>{articleTitle}</td>
            <td className="">
                <Link to={`/article-details/${article._id}`}>
                    <button type="button" className="btn btn-outline btn-sm btn-info">
                        Details
                    </button>
                </Link>
            </td>
            <td><span className={`${status === 'Pending' && 'bg-yellow-200 px-4 py-1 rounded-3xl'} ${status === 'Accepted' && 'bg-green-200 px-4 py-1 rounded-3xl'} ${status === 'bg-red-200 px-4 py-1 rounded-3xl'}`}>{status}</span></td>
            <td>{isPremium}</td>
            <td>
                <button onClick={openModal} className="btn btn-outline btn-sm btn-accent">
                    Update
                </button>
            </td>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-outline btn-sm btn-error">
                    Delete
                </button>
            </td>

            <UpdateModal
                isOpen={isModalOpen}
                onClose={closeModal}
                article={article}
                refetch={refetch}
            ></UpdateModal>


        </tr>
    );
};

TableRow.propTypes = {
    article: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,

}

export default TableRow;