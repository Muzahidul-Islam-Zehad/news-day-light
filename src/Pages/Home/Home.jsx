import { Carousel } from "react-responsive-carousel";
import PageHeading from "../../Components/SharedComponents/PageHeading";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import useAllPublisher from "../../Hooks/useAllPublisher";
import PublisherCard from "../../Components/PublisherCard/PublisherCard";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

const Home = () => {
    const axiosPublic = useAxiosPublic();

    const [publishers] = useAllPublisher();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const { data: trendingArticles = [], isLoading } = useQuery({
        queryKey: ['trending-article'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/articles/trending');
            return data;
        }
    });

    const { data: usersCount = {} } = useQuery({
        queryKey: ['users-count'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/users-count');
            return data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-11/12 mx-auto py-10">
            <div>
                <PageHeading title="trending news" subtitle="Explore world trendings" />
            </div>

            {/* Trending Banner Section */}
            <div className="mt-8 mx-auto max-w-4xl">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    transitionTime={800}
                    className="rounded-lg shadow-lg overflow-hidden"
                >
                    {trendingArticles.map((ta) => (
                        <div
                            key={ta._id}
                            className="relative h-[250px] md:h-[350px] lg:h-[450px] bg-black text-white"
                        >
                            <Link to={`/article-details/${ta._id}`}>
                                <img
                                    src={ta.articleImage}
                                    alt={ta.articleTitle}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent w-full p-4">
                                    <h3 className=" legend text-lg md:text-xl lg:text-2xl font-bold">
                                        {ta.articleTitle}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Publisher section */}
            <section>
                <div className="mt-10 mb-4">
                    <PageHeading title={'publishers'} subtitle='The publishers who are connected'></PageHeading>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        publishers.map(publisher => <PublisherCard key={publisher._id} publisher={publisher}></PublisherCard>)
                    }
                </div>

            </section>

            {/* total user show  */}
            <div className="flex justify-center mt-10">
                <div className="stats shadow">
                    <div className="stat place-items-center">
                        <div className="stat-title">Total User</div>
                        <div className="stat-value">
                            <CountUp end={usersCount?.allUserCount} duration={5} />
                        </div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title">Normal User</div>
                        <div className="stat-value">
                            <CountUp end={usersCount?.normalUsersCount} duration={5} />
                        </div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title">Premium User</div>
                        <div className="stat-value">
                            <CountUp end={usersCount?.premiumUsersCount} duration={5} />
                        </div>
                    </div>
                </div>
            </div>

            {/* show plan cards */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-10">
                    {/* Free Plan Card */}
                    <div className="card bg-gray-100 shadow-lg border border-gray-300 p-6 rounded-lg hover:shadow-xl transition flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Free Plan</h2>
                            <p className="text-gray-600 text-center mb-4">Perfect for beginners</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Can post 1 article</li>
                                <li>Can&apos;t visit premium articles</li>
                            </ul>
                        </div>
                        <div className="mt-6 text-center">
                            <span className="block text-3xl font-bold text-gray-800 mb-2">Free</span>
                            {/* <button
                                className="btn bg-gray-300 text-gray-700 cursor-not-allowed font-semibold py-2 px-6 rounded-lg"
                                disabled
                            >
                                Current Plan
                            </button> */}
                        </div>
                    </div>

                    {/* Monthly Plan Card */}
                    <div className="card bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg border border-indigo-400 p-6 rounded-lg hover:shadow-xl transition flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-center">Monthly Plan</h2>
                            <p className="text-white/90 text-center mb-4">Ideal for regular users</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Unlimited article posts</li>
                                <li>Access premium articles</li>
                                <li>Cancel anytime</li>
                            </ul>
                        </div>
                        <div className="mt-6 text-center">
                            <span className="block text-3xl font-bold mb-2">$10</span>
                            <span className="text-sm block mb-4">per month</span>
                            <Link to={'/subscription'}>
                                <button className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg">
                                    Buy Now
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Yearly Plan Card */}
                    <div className="card bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg border border-teal-400 p-6 rounded-lg hover:shadow-xl transition flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-center">Yearly Plan</h2>
                            <p className="text-white/90 text-center mb-4">Best value for money</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Unlimited article posts</li>
                                <li>Access premium articles</li>
                                <li>2 months free</li>
                            </ul>
                        </div>
                        <div className="mt-6 text-center">
                            <span className="block text-3xl font-bold mb-2">$100</span>
                            <span className="text-sm block mb-4">per year</span>
                            <Link to={'/subscription'}>
                                <button className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg">
                                    Buy Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {showModal &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-2xl font-bold mb-4 text-center">Subscribe Now</h2>
                            <p className="text-gray-600 text-center mb-6">
                                Enjoy premium benefits by subscribing to our service!
                            </p>
                            <div className="flex justify-center gap-6">
                                <button
                                    className="btn btn-sm"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <Link to={'/subscription'}>
                                    <button
                                        className="btn btn-sm btn-primary"
                                    >
                                        Subscribe
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </div>
    );
};

export default Home;
