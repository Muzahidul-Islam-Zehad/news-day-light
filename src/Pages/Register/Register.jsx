import { useState } from "react";
import { imageNameShorter } from "../../Utilities/ImageNameShorter";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BsBrightnessHighFill } from "react-icons/bs";
import { imageUploadToImageBB } from "../../Utilities/UploadImageOnImageBB";

const Register = () => {
    const { googleLogin, loading, setLoading, registerWithEmailAndPassword, updateUserProfile } = useAuth();
    const [photoName, setPhotoName] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [registerLoading, setRegisterLoading] = useState(false);
   

    const handleImageUpload = (e) => {
        const imageName = imageNameShorter(e.target.files);
        // console.log(imageName);
        setPhotoName(imageName);
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setErrMsg('');
        

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const password = form.password.value;

        if (!name || !email || !image || !password) {
            setErrMsg('(*) marked fields are required');
            return;
        }

        setRegisterLoading(true);

        const lowerCaseRegEx = /[a-z]/;
        const upperCaseRegEx = /[A-Z]/;
        const numaricCaseRegEx = /[0-9]/;

        const userInfo= {email}

        const {data} = await axiosPublic.post('/users', userInfo);

        // console.log(data);

        if(!data.message)
        {
            setErrMsg('Email already registered');
            setRegisterLoading(false);
            return ;
        }
        if (password.length < 6) {
            setErrMsg('Password should be atleast 6 character');
            setRegisterLoading(false);
            return;
        }
        if (!lowerCaseRegEx.test(password)) {
            setErrMsg('Password have to contain atleast one lowercase letter [a-z]');
            setRegisterLoading(false);
            return;
        }
        if (!upperCaseRegEx.test(password)) {
            setErrMsg('Password have to contain atlease one uppercase letter [A-Z]');
            setRegisterLoading(false);
            return;
        }
        if (!numaricCaseRegEx.test(password)) {
            setErrMsg('Password have to contain atleast one numaric value [0-9]');
            setRegisterLoading(false);
            return;
        }



        const photoURL = await imageUploadToImageBB(image)
        

        try {

            //create a user with email and password
            await registerWithEmailAndPassword(email, password);

            //update name and photo on user profile
            await updateUserProfile({ displayName: name, photoURL });

            //add new user in database
            await axiosPublic.post('/users/new', {name,email,photoURL})

            toast.success('Registration successful' , {
                duration: 1000,
            })

            navigate('/');
        }
        catch (err) {
            toast.error('Registration Failed' , {
                duration: 1000,
            })
            console.log(err);
        }
        finally {
            form.reset()
            setLoading(false);
            setRegisterLoading(false);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const {user} = await googleLogin();

            const userInfo = {
                name : user.displayName,
                email : user.email,
                photoURL: user.photoURL
            }

            await axiosPublic.post('/users/new/google' , userInfo);
            
            toast.success('Login successful' , {
                duration: 1000,
            })
            navigate('/');
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    const handleEyeButton = () =>{
        setIsVisible(!isVisible);
    }
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F4F6F8] py-10">
            <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                <div className="text-center pt-4">
                    <h1 className="text-3xl font-bold text-[#003366]">Register Here</h1>
                    <p className="text-[#6C757D]">Register to explore news</p>
                    <hr className="mt-3 w-5/6 mx-auto" />
                </div>
                <form onSubmit={handleSubmitForm} className="card-body pb-3">
                    {/* name field */}
                    <div className="form-control">
                        <label className="label ">
                            <span className="label-text text-[#6C757D]">Name<span className="text-red-600 font-bold">*</span></span>
                        </label>
                        <input type="text" name="name" placeholder="name" className="input input-bordered bg-[#F9FAFB] border border-[#D1D5DB] text-[#333333] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] placeholder:text-[#A0AEC0]" />
                    </div>

                    {/* email field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#6C757D]">Email<span className="text-red-600 font-bold">*</span></span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered bg-[#F9FAFB] border border-[#D1D5DB] text-[#333333] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] placeholder:text-[#A0AEC0]" />
                    </div>

                    {/* Photo field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#6C757D]">Photo<span className="text-red-600 font-bold">*</span></span>
                        </label>
                        <label className="text-center border border-dashed hover:cursor-pointer border-gray-400 p-3 rounded-md bg-[#F9FAFB]">
                            {
                                photoName ? <span>{photoName}</span> : <span>Choose A Photo</span>
                            }

                            <input onChange={handleImageUpload} hidden type="file" name="image" id="" />
                        </label>
                    </div>

                    {/* password field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#6C757D]">Password<span className="text-red-600 font-bold">*</span></span>
                        </label>
                        <div className="relative">
                            <input type={isVisible? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered w-full bg-[#F9FAFB] border border-[#D1D5DB] text-[#333333] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] placeholder:text-[#A0AEC0]" />
                            <div onClick={handleEyeButton} className="absolute right-4 top-2 p-2 cursor-pointer">
                                {
                                    isVisible ?
                                        <span ><FaRegEyeSlash /></span>
                                        :
                                        <span ><FaRegEye /></span>
                                }

                            </div>
                        </div>

                        <label className="mt-3">
                            <span>Already have an account? <Link to={'/login'} className="text-blue-800 font-bold hover:text-[#FFC107]">Login</Link></span>
                        </label>
                    </div>
                    <div>
                        {
                            errMsg && <p className="mt-3 text-xs text-red-600 animate-bounce font-bold">{errMsg}</p>
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button disabled={registerLoading || loading} className="btn bg-[#003366] text-white hover:bg-[#002B55]">{
                            registerLoading?
                            <span className="text-xl animate-spin"><BsBrightnessHighFill /></span>
                            :
                            'Register'
                            }</button>
                    </div>
                </form>
                <div className="divider w-5/6 mx-auto">OR</div>
                <div className="w-5/6 mx-auto text-center mb-5">
                    <button onClick={handleGoogleLogin} className="btn w-full bg-[#E0E0E0] hover:bg-[#D1D5DB] text-[#333333]"><span className="text-xl"><FcGoogle /></span> Register With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;