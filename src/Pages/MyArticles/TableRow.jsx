import PropTypes from "prop-types";
import {  useState } from "react";
import { Link } from "react-router-dom";
import UpdateArticleModal from "./UpdateArticleModal";

const TableRow = ({ article, idx, handleDelete, refetch }) => {
    const { articleTitle, status, isPremium, _id } = article || {};

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [decliningMsg, setDecliningMsg] = useState('');



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        refetch();
    }

    const handleSeeDeclineReason =() =>{
        if(decliningMsg)
        {
            setDecliningMsg(decliningMsg)
        }
        document.getElementById('my_modal_3').showModal();
    }

    return (
        <tr className="hover font-medium">
            <th>{idx + 1}</th>
            <td>{
                articleTitle.length > 40 ? articleTitle.substring(0, 30) + '...' : articleTitle
            }</td>
            <td className="">
                <Link to={`/article-details/${article._id}`}>
                    <button type="button" className="btn btn-outline btn-sm btn-info">
                        Details
                    </button>
                </Link>
            </td>
            <td><span className={`${status === 'Pending' && 'bg-yellow-200 px-4 py-1 rounded-3xl'} ${status === 'Accepted' && 'bg-green-200 px-4 py-1 rounded-3xl'} ${status === 'bg-red-200 px-4 py-1 rounded-3xl'}`}>{
                status === 'Declined' ?
                    <span className="cursor-pointer" onClick={handleSeeDeclineReason}>{status}</span>
                    :
                    status

            }</span></td>
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
            {/* modal for see declining reason */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            {/* <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-rose-600">Declining Reason :</h3>
                    <p className="py-4">{decliningMsg}</p>
                </div>
            </dialog> */}

            <UpdateArticleModal
                isOpen={isModalOpen}
                onClose={closeModal}
                article={article}
                refetch={refetch}
            ></UpdateArticleModal>


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