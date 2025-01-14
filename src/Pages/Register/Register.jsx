import { useState } from "react";
import { imageNameShorter } from "../../Utilities/ImageNameShorter";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const [photoName, setPhotoName] = useState(null);
    console.log(photoName);


    const handleImageUpload = (e) =>
    {
        const imageName = imageNameShorter(e.target.files);
        console.log(imageName);
        setPhotoName(imageName);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F4F6F8] py-10">
            <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                <div className="text-center pt-4">
                    <h1 className="text-3xl font-bold text-[#003366]">Register Here</h1>
                    <p className="text-[#6C757D]">Register to explore news</p>
                    <hr className="mt-3 w-5/6 mx-auto"/>
                </div>
                <form className="card-body pb-3">
                    <div className="form-control">
                        <label className="label ">
                            <span className="label-text text-[#6C757D]">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name" className="input input-bordered bg-[#F9FAFB] border border-[#D1D5DB] text-[#333333] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] placeholder:text-[#A0AEC0]" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#6C757D]">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered bg-[#F9FAFB] border border-[#D1D5DB] text-[#333333] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] placeholder:text-[#A0AEC0]" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#6C757D]">Photo</span>
                        </label>
                        <label className="text-center border border-dashed hover:cursor-pointer border-gray-400 p-3 rounded-md bg-[#F9FAFB]">
                            {
                                photoName ? <span>{photoName}</span> : <span>Choose A Photo</span>
                            }
                            
                            <input onChange={handleImageUpload} hidden type="file" name="photo" id="" required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#6C757D]">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered bg-[#F9FAFB] border border-[#D1D5DB] text-[#333333] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] placeholder:text-[#A0AEC0]" required />
                        <label className="mt-3">
                            <span>Already have an account? <Link to={'/login'} className="text-blue-800 font-bold hover:text-[#FFC107]">Login</Link></span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#003366] text-white hover:bg-[#002B55]">Register</button>
                    </div>
                </form>
                <div className="divider w-5/6 mx-auto">OR</div>
                <div className="w-5/6 mx-auto text-center mb-5">
                    <button className="btn w-full bg-[#E0E0E0] hover:bg-[#D1D5DB] text-[#333333]"><span className="text-xl"><FcGoogle /></span> Register With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;