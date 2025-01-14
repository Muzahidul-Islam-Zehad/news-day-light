import {     Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const {pathname} = useLocation();
    console.log(pathname);
//className={`${pathname ==='/'? 'text-[#E63946]' : ''}`}
    const links = <>
        <div className=""><Link to={'/'} className={`px-4 py-2  ${pathname ==='/'? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Home</Link></div>
        <div className=""><Link to={'/add-articles'} className={`px-4 py-2  ${pathname ==='/add-articles'? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Add Articles</Link></div>
        <div className=""><Link to={'/all-articles'} className={`px-4 py-2  ${pathname ==='/all-articles'? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>All Articles</Link></div>
        <div className=""><Link to={'/subscription'} className={`px-4 py-2  ${pathname ==='/subscription'? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Subscription</Link></div>
        <div className=""><Link to={'/dashboard'} className={`px-4 py-2  ${pathname ==='/dashboard'? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Dashboard </Link></div>
        <div className=""><Link to={'my-articles'} className={`px-4 py-2  ${pathname ==='/my-articles'? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>My Articles</Link></div>
        <div className=""><Link to={'/premium-articles'} className={`px-4 py-2  ${pathname ==='/premium-articles'? 'bg-[#00B4D8] rounded-lg font-bold' : ''}`}>Premium Articles</Link></div>
    </>
    return (
        <div className="bg-[#003366] text-[#FFFFFF]">
            <div className="navbar  default-width">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                    <p className=" text-xl ">NewsDayLight</p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-[#E0E0E0]">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link className="btn w-20 rounded-r-none rounded-l-3xl border border-r-gray-200">Login</Link>
                    <Link className="btn w-20 rounded-l-none rounded-r-3xl border border-l-gray-200">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;