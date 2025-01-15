import PropTypes from "prop-types";

const TableRow = ({ article, idx, handleDelete }) => {
    const { articleTitle, status, isPremium, _id } = article || {};
    return (
        <tr className="hover font-medium">
            <th>{idx + 1}</th>
            <td>{articleTitle}</td>
            <td className="">
                <button className="btn btn-outline btn-sm btn-info">
                    Details
                </button>
            </td>
            <td><span className={`${status === 'Pending' && 'bg-yellow-200 px-4 py-1 rounded-3xl'} ${status === 'Accepted' && 'bg-green-200 px-4 py-1 rounded-3xl'} ${status === 'bg-red-200 px-4 py-1 rounded-3xl'}`}>{status}</span></td>
            <td>{isPremium}</td>
            <td>
                <button className="btn btn-outline btn-sm btn-accent">
                    Update
                </button>
            </td>
            <td>
                <button onClick={()=>handleDelete(_id)} className="btn btn-outline btn-sm btn-error">
                    Delete
                </button>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    article: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,

}

export default TableRow;