import { Link, useLocation, Outlet } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";

const Dashboard = () => {
    const { pathname } = useLocation();

    const closeDrawer = () => {
        document.getElementById('my-drawer-2').checked = false;
    }

    return (
        <div className="  mx-auto">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <div className="w-11/12 mx-auto mt-4">
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                            <span className="text-2xl text-white"><IoIosMenu /></span>
                        </label>
                    </div>

                    {/* Outlet Content */}
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2 dark:bg-gray-700">
                        {/* Sidebar content */}
                        <Link to={'/dashboard'} onClick={closeDrawer}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white dark:text-white rounded-xl text-center ${pathname === '/dashboard' ? 'bg-slate-400 text-white' : ''}`}>
                                Statistics
                            </div>
                        </Link>
                        <Link to={'/dashboard/all-users'} onClick={closeDrawer}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white dark:text-white rounded-xl text-center ${pathname === '/dashboard/all-users' ? 'bg-slate-400 text-white' : ''}`}>
                                All Users
                            </div>
                        </Link>
                        <Link to={'/dashboard/all-articles-admin'} onClick={closeDrawer}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white dark:text-white rounded-xl text-center ${pathname === '/dashboard/all-articles-admin' ? 'bg-slate-400 text-white' : ''}`}>
                                All Articles
                            </div>
                        </Link>
                        <Link to={'/dashboard/add-publisher'} onClick={closeDrawer}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white dark:text-white rounded-xl text-center ${pathname === '/dashboard/add-publisher' ? 'bg-slate-400 text-white' : ''}`}>
                                Add Publisher
                            </div>
                        </Link>
                        <div className="divider mt-10"></div>
                        <Link to={'/dashboard/my-profile'} onClick={closeDrawer}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white dark:text-white rounded-xl text-center ${pathname === '/dashboard/my-profile' ? 'bg-slate-400 text-white' : ''}`}>
                                My Profile
                            </div>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
