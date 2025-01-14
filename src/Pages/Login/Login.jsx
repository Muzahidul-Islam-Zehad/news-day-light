import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
    const [errMsg, setErrMsg] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { googleLogin, loading, setLoading, loginWithEmainAndPassword} = useAuth();

    const handleSubmitForm = async(e) =>{
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try{
            await loginWithEmainAndPassword(email, password);
            toast.success('Login successful' , {
                duration: 1000,
            })
            navigate('/');
        }
        catch(err)
        {
            console.log(err);
            setErrMsg('Invalid email of password');
        }
        finally{
            setLoading(false);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
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
                    <h1 className="text-3xl font-bold text-[#003366]">Login Here</h1>
                    <p className="text-[#6C757D]">Login to explore news</p>
                    <hr className="mt-3 w-5/6 mx-auto" />
                </div>
                <form onSubmit={handleSubmitForm} className="card-body pb-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#6C757D]">Email<span className="text-red-600 font-bold">*</span></span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered bg-[#F9FAFB] border border-[#D1D5DB] text-[#333333] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] placeholder:text-[#A0AEC0]" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#6C757D]">Password<span className="text-red-600 font-bold">*</span></span>
                        </label>
                        <div className="relative">
                            <input type={isVisible? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered w-full bg-[#F9FAFB] border border-[#D1D5DB] text-[#333333] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none focus:border-[#00B4D8] placeholder:text-[#A0AEC0]" required/>
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
                            <span>Don&apos;t have any account? <Link to={'/registration'} className="text-blue-800 font-bold hover:text-[#FFC107]">Register</Link></span>
                        </label>
                    </div>
                    <div>
                        {
                            errMsg && <p className="mt-3 text-xs text-red-600 animate-bounce font-bold">{errMsg}</p>
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#003366] text-white hover:bg-[#002B55]">Login</button>
                    </div>
                </form>
                <div className="divider w-5/6 mx-auto">OR</div>
                <div className="w-5/6 mx-auto text-center mb-5">
                    <button onClick={handleGoogleLogin} className="btn w-full bg-[#E0E0E0] hover:bg-[#D1D5DB] text-[#333333]"><span className="text-xl"><FcGoogle /></span> Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;