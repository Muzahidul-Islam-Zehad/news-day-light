import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import AddArticles from "../Pages/AddArticles/AddArticles";
import Home from "../Pages/Home/Home";
import AllArticles from "../Pages/AllArticles/AllArticles";
import Subscription from "../Pages/Subscription/Subscription";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import MyArticles from "../Pages/MyArticles/MyArticles";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ArticleDetails from "../Pages/ArticleDetails/ArticleDetails";
import UserProfile from "../Pages/UserProfile/UserProfile";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllArticlesAdmin from "../Pages/Dashboard/AllArticles/AllArticlesAdmin";
import AddPublisher from "../Pages/Dashboard/AddPublisher/AddPublisher";
import Payment from "../Pages/Payment/Payment";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SubscribedRoute from "./SubscribedRoute/SubscribedRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children:[
            {
                index: true,
                element:<Home></Home>
            },
            {
                path:'/add-articles',
                element:<PrivateRoute><AddArticles></AddArticles></PrivateRoute>
            },
            {
                path:'/all-articles',
                element:<AllArticles></AllArticles>
            },
            {
                path:'/subscription',
                element: <PrivateRoute><Subscription></Subscription></PrivateRoute>
            },
            {
                path: '/dashboard',
                element:<AdminRoute><Dashboard></Dashboard></AdminRoute>,
                children:[
                    {
                        path:'/dashboard',
                        element: <Statistics></Statistics>
                    },
                    {
                        path:'all-users',
                        element: <AllUsers></AllUsers>
                    },
                    {
                        path: 'all-articles-admin',
                        element: <AllArticlesAdmin></AllArticlesAdmin>
                    },
                    {
                        path:'add-publisher',
                        element: <AddPublisher></AddPublisher>
                    },
                    {
                        path: 'my-profile',
                        element: <MyProfile></MyProfile>
                    }
                ]
            },
            {
                path:'/my-articles',
                element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
            },
            {
                path: '/premium-articles',
                element:<SubscribedRoute><PremiumArticles></PremiumArticles></SubscribedRoute>
            },
            {
                path: '/article-details/:id',
                element: <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>
            },
            {
                path: '/user/profile',
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            }
        ]
    },
    {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'/registration',
        element: <Register></Register>
    },
    {
        path: '/payment',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
    },
    {
        path : "*",
        element: <ErrorPage></ErrorPage>
    }
    
])

export default router;