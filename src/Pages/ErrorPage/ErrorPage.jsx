import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex justify-center min-h-screen items-center bg-slate-700">
            <div className="text-center">
                <h1 className="text-red-600 text-7xl font-black">404</h1>
                <p className=" uppercase mt-2 mb-6 font-bold text-xl text-slate-300">page not found</p>
                <Link to={-1}><button className="btn btn-error text-white">Back</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;