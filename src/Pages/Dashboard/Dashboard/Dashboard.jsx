import { Link, useLocation, Outlet } from "react-router-dom";

const Dashboard = () => {
    const { pathname } = useLocation();

    return (
        <div className="py-6 w-11/12 mx-auto">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open Menu
                    </label>

                    {/* Outlet Content */}
                    <div className="p-6">
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
                        {/* Sidebar content */}
                        <Link to={'/dashboard'}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white rounded-xl text-center ${pathname === '/dashboard' ? 'bg-slate-400 text-white' : ''}`}>
                                Statistics
                            </div>
                        </Link>
                        <Link to={'/dashboard/all-users'}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white rounded-xl text-center ${pathname === '/dashboard/all-users' ? 'bg-slate-400 text-white' : ''}`}>
                                All Users
                            </div>
                        </Link>
                        <Link to={'/dashboard/all-articles-admin'}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white rounded-xl text-center ${pathname === '/dashboard/all-articles-admin' ? 'bg-slate-400 text-white' : ''}`}>
                                All Articles
                            </div>
                        </Link>
                        <Link to={'/dashboard/add-publisher'}>
                            <div className={`px-4 py-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white rounded-xl text-center ${pathname === '/dashboard/add-publisher' ? 'bg-slate-400 text-white' : ''}`}>
                                Add Publisher
                            </div>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
