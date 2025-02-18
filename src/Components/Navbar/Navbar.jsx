import { Link, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const { pathname } = useLocation();
    const { user, logoutUser, isAdmin } = useAuth();
    // const axiosSecure = useAxiosSecure();


    // const { data } = useQuery({
    //     queryKey: ['is-Subscribed', pathname],
    //     enabled: !!user?.email,
    //     queryFn: async () => {
    //         const { data } = await axiosSecure.get(`/isPremium?email=${user?.email}`);
    //         setSubscribed(data);
    //         return data;
    //     }
    // })


    const links = <>
        <div className={``}><Link to={'/'} className={`px-4 py-2  ${pathname === '/' ? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Home</Link></div>
        <div className={`${user?.email ? 'block' : 'hidden'}`}><Link to={'/add-articles'} className={`px-4 py-2  ${pathname === '/add-articles' ? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Add Articles</Link></div>
        <div className={``}><Link to={'/all-articles'} className={`px-4 py-2  ${pathname === '/all-articles' ? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>All Articles</Link></div>
        <div className={`${user?.email ? 'block' : 'hidden'}`}><Link to={'/subscription'} className={`px-4 py-2  ${pathname === '/subscription' ? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Subscription</Link></div>
        <div className={`${user?.email ? 'block' : 'hidden'}`}><Link to={'my-articles'} className={`px-4 py-2  ${pathname === '/my-articles' ? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>My Articles</Link></div>
        <div className={`${user?.email ? 'block' : 'hidden'}`}><Link to={'/premium-articles'} className={`px-4 py-2  ${pathname === '/premium-articles' ? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Premium Articles</Link></div>
        {
            isAdmin ?

                <div className={`${user?.email && isAdmin ? 'block' : 'hidden'}`}><Link to={'/dashboard'} className={`px-4 py-2  ${pathname === '/dashboard' ? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Dashboard </Link></div>
                :
                <div className={`${user?.email ? 'block' : 'hidden'}`}><Link to={'/user-dashboard'} className={`px-4 py-2  ${pathname === '/user-dashboard' ? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Dashboard </Link></div>
        }
    </>


    const handleLogOut = async () => {
        try {
            await logoutUser();
            toast.success('Logout successful', {
                duration: 1000,
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="bg-[#003366] text-[#FFFFFF]">
            <div className="navbar  default-width">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="w-8 h-8 flex justify-start items-center lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm bg-base-300 dropdown-content rounded-box z-[1] mt-3 w-52 py-4 px-2 shadow text-black space-y-2">

                            {
                                links
                            }

                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center mr-3">
                        <img className="w-12" src='https://i.ibb.co.com/Y7VfxdWN/news-Day-Light-Logo-Final.png' alt="" />
                        <p className=" hidden md:block text-xl ">NewsDayLight</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-[#E0E0E0]">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email
                            ?
                            <div className="flex items-center justify-between gap-4">
                                {/* <img referrerPolicy="no-referrer" className="w-12 h-12 rounded-full border-2 object-cover border-yellow-400" src={user?.photoURL} alt="user" /> */}

                                <div className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button"><div className="avatar cursor-pointer">
                                        <div className="ring-primary ring-offset-base-100 w-8 h-8 md:w-12 md:h-12 rounded-full ring ring-offset-2">
                                            <img src={user?.photoURL} />
                                        </div>
                                    </div></div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1]  p-1 shadow mr-2">
                                        <li>
                                            <button onClick={handleLogOut} className="btn btn-sm md:btn-md border-none hover:bg-[#913831] bg-[#ea645b]  text-white ">Logout</button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            :
                            <>
                                <Link to={'/login'} className="btn w-20 rounded-r-none rounded-l-3xl border border-r-gray-200">Login</Link>
                                <Link to={'/registration'} className="btn w-20 rounded-l-none rounded-r-3xl border border-l-gray-200">Register</Link>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;