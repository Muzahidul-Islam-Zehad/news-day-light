
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import PageHeading from "../../Components/SharedComponents/PageHeading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMyArticle from "../../Hooks/useMyArticle";
import TableRow from "./TableRow";

const MyArticles = () => {

    const [myArticleData, isLoading, refetch] = useMyArticle();
    const axiosSecure = useAxiosSecure();

    console.log(myArticleData);

    if (isLoading || !myArticleData) {
        return <LoadingSpinner></LoadingSpinner>
    }


    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await axiosSecure.delete(`/my-articles/${id}`);
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your article has been deleted.",
                        icon: "success"
                    });
                }
                catch (err) {
                    console.log(err);
                }

            }
        });
    }

    return (
        <div className="w-11/12 mx-auto">
            <div>
                <PageHeading title='my articles' subtitle='Articles you have submited'></PageHeading>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <h1>Article found {myArticleData.length}</h1>
                    <table className="table border">
                        {/* head */}
                        <thead className="bg-[#003366] text-[#FFFFFF]">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Details</th>
                                <th>Status</th>
                                <th>Premium</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                myArticleData.map((article, idx) => {
                                    return (
                                        <TableRow key={article._id} handleDelete={handleDelete} article={article} idx={idx}></TableRow>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyArticles;