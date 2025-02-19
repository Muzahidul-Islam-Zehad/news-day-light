import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AboutUs = () => {
    const axiosPublic = useAxiosPublic();

    const { data: usersCount = {}, isLoading } = useQuery({
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
        <div>
            {/* about us section */}
            <section id="about-us" className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Title */}
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                        About <span className="text-blue-500">NewsDayLight</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        NewsDayLight is a dynamic news platform designed to keep you informed with trending articles,
                        exclusive premium content, and an interactive publishing system. Whether you&apos;re a reader or a writer,
                        we empower you with the latest news and insights.
                    </p>

                    {/* Stats Section */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-3xl font-bold text-blue-500">500+</h3>
                            <p className="text-gray-700 dark:text-gray-300">Daily Articles</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-3xl font-bold text-blue-500">{usersCount?.allUserCount}+</h3>
                            <p className="text-gray-700 dark:text-gray-300">Active Users</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-3xl font-bold text-blue-500">1M+</h3>
                            <p className="text-gray-700 dark:text-gray-300">Total Views</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-3xl font-bold text-blue-500">100+</h3>
                            <p className="text-gray-700 dark:text-gray-300">Verified Writers</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    {/* <div className="mt-12">
                        <a
                            href="/about"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                        >
                            Learn More
                        </a>
                    </div> */}
                </div>
            </section>

        </div>
    );
};

export default AboutUs;