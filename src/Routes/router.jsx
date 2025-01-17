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
                element:<AddArticles></AddArticles>
            },
            {
                path:'/all-articles',
                element:<AllArticles></AllArticles>
            },
            {
                path:'/subscription',
                element: <Subscription></Subscription>
            },
            {
                path: '/dashboard',
                element:<Dashboard></Dashboard>,
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
                    }
                ]
            },
            {
                path:'/my-articles',
                element: <MyArticles></MyArticles>
            },
            {
                path: '/premium-articles',
                element:<PremiumArticles></PremiumArticles>
            },
            {
                path: '/article-details/:id',
                element: <ArticleDetails></ArticleDetails>
            },
            {
                path: '/user/profile',
                element: <UserProfile></UserProfile>
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
    
])

export default router;