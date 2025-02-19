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
        <div className="bg-white py-10 dark:bg-gray-900 ">
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
                            className="relative h-[250px] md:h-[350px] lg:h-[450px] bg-black text-white "
                        >
                            <img
                                src={ta.articleImage}
                                alt={ta.articleTitle}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent h-40 w-full p-4 flex items-end">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
                                    {ta.articleTitle}
                                </h3>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Publisher section */}
            <section className="w-11/12 mx-auto">
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
            <section>
                <div className="mt-10 mb-4">
                    <PageHeading title={'total users'} subtitle='The users who are connected'></PageHeading>
                </div>
                <div className="flex justify-center mt-10 ">
                    <div className="stats shadow dark:bg-[#2d303c]">
                        <div className="stat place-items-center">
                            <div className="stat-title dark:text-gray-200">Total User</div>
                            <div className="stat-value dark:text-gray-200">
                                <CountUp end={usersCount?.allUserCount} duration={5} />
                            </div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title dark:text-gray-200">Normal User</div>
                            <div className="stat-value dark:text-gray-200">
                                <CountUp end={usersCount?.normalUsersCount} duration={5} />
                            </div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title dark:text-gray-200">Premium User</div>
                            <div className="stat-value dark:text-gray-200">
                                <CountUp end={usersCount?.premiumUsersCount} duration={5} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* show plan cards */}
            <section>
                <div className="mt-10 mb-4">
                    <PageHeading title={'Our Plans'} subtitle='Be premium to get premium'></PageHeading>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-10">
                    {/* Free Plan Card */}
                    <div className="card bg-gray-100 dark:bg-gray-800 shadow-lg border border-gray-300 p-6 rounded-lg hover:shadow-xl transition flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Free Plan</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">Perfect for beginners</p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
                                <li>Can post 1 article</li>
                                <li>Can&apos;t visit premium articles</li>
                            </ul>
                        </div>
                        <div className="mt-6 text-center">
                            <span className="block text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Free</span>
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
                        <div className="bg-white dark:bg-[#252525] p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-200">Subscribe Now</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
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

            {/* how to make Proper Article */}
            <section>
                <div className="mt-10 mb-4">
                    <PageHeading title={'make professional article'} subtitle='How to make articles like pro'></PageHeading>
                </div>
                <div>
                    <div className="flex justify-center p-6 bg-gray-100 dark:bg-gray-800 w-full">
                        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-600 rounded-lg overflow-hidden w-full max-w-4xl">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4">
                                <h2 className="text-2xl font-bold">Writing Professional Articles</h2>
                                <p className="mt-1 text-sm">
                                    Master the art of crafting engaging and impactful content.
                                </p>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-blue-500 text-lg font-bold">1.</span>
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-gray-200">Choose a Relevant Topic</h3>
                                        <p className="text-gray-600 text-sm dark:text-gray-400">
                                            Understand your audience and select topics that resonate with their interests and needs. Use analytics tools to identify trends.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-blue-500 text-lg font-bold">2.</span>
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-gray-200">Write a Catchy Headline</h3>
                                        <p className="text-gray-600 text-sm dark:text-gray-400">
                                            The headline is the first impression. Use strong keywords and keep it concise to grab attention.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-blue-500 text-lg font-bold">3.</span>
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-gray-200">Engage with an Introduction</h3>
                                        <p className="text-gray-600 text-sm dark:text-gray-400">
                                            Start with a hook—an interesting fact, question, or anecdote—to draw readers in and set the tone.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-blue-500 text-lg font-bold">4.</span>
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-gray-200">Structure Your Content</h3>
                                        <p className="text-gray-600 text-sm dark:text-gray-400">
                                            Use headings, subheadings, and bullet points to make the content easy to scan. Break up large blocks of text.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-blue-500 text-lg font-bold">5.</span>
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-gray-200">Proofread and Edit</h3>
                                        <p className="text-gray-600 text-sm dark:text-gray-400">
                                            Ensure the content is free of grammatical errors and flows naturally. Editing improves readability and professionalism.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            {/* <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 text-center">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                                    Learn More
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ section */}
            <section>
                <div className="mt-10 mb-4">
                    <PageHeading title={'faq'} subtitle='Explore your unknown questions'></PageHeading>
                </div>
                <div>
                    <div className="bg-gray-100 dark:bg-gray-800 py-12 px-6 lg:px-16">
                        <div className=" mx-auto flex flex-col lg:flex-row  gap-8">
                            {/* Left: Image */}
                            <div className="lg:w-1/2">
                                <img
                                    src="https://i.ibb.co.com/f8tqx75/Faq.jpg"
                                    alt="FAQ Illustration"
                                    className="rounded-lg shadow-lg w-full "
                                />
                            </div>

                            {/* Right: Accordion */}
                            <div className="">
                                <h2 className="text-3xl dark:text-gray-200 font-bold text-gray-800 mb-6">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    {/* Accordion Item 1 */}
                                    <div
                                        tabIndex={0}
                                        className="collapse collapse-arrow border border-base-300 bg-white dark:bg-gray-800 rounded-lg"
                                    >
                                        <div className="collapse-title text-lg dark:text-gray-200 font-medium">
                                            How can I access premium articles?
                                        </div>
                                        <div className="collapse-content">
                                            <p className="dark:text-gray-400">
                                                To access premium articles, you need to subscribe to our
                                                premium plan. Once subscribed, premium articles will be
                                                unlocked for your account.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Accordion Item 2 */}
                                    <div
                                        tabIndex={0}
                                        className="collapse collapse-arrow border border-base-300 bg-white dark:bg-gray-800 rounded-lg"
                                    >
                                        <div className="collapse-title text-lg dark:text-gray-200 font-medium">
                                            What is included in the premium subscription?
                                        </div>
                                        <div className="collapse-content">
                                            <p className="dark:text-gray-400">
                                                The premium subscription includes access to exclusive articles,
                                                ad-free browsing, and early access to trending content. You
                                                will also receive personalized recommendations.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Accordion Item 3 */}
                                    <div
                                        tabIndex={0}
                                        className="collapse collapse-arrow border border-base-300 bg-white dark:bg-gray-800 rounded-lg"
                                    >
                                        <div className="collapse-title text-lg dark:text-gray-200 font-medium">
                                            How can I become a publisher?
                                        </div>
                                        <div className="collapse-content">
                                            <p className="dark:text-gray-400">
                                                To become a publisher, sign up and contact our admin team
                                                through your dashboard. Once approved, you can start
                                                publishing articles.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Accordion Item 4 */}
                                    <div
                                        tabIndex={0}
                                        className="collapse collapse-arrow border border-base-300 bg-white dark:bg-gray-800 rounded-lg"
                                    >
                                        <div className="collapse-title text-lg dark:text-gray-200 font-medium">
                                            How do I report an issue with an article?
                                        </div>
                                        <div className="collapse-content">
                                            <p className="dark:text-gray-400">
                                                If you encounter any issues with an article, click the
                                                Report button below the article or contact our support team
                                                with the details of the issue.
                                            </p>
                                        </div>
                                    </div>
                                    {/* Accordion Item 1 */}
                                    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-white dark:bg-gray-800 rounded-lg">
                                        <div className="collapse-title text-lg dark:text-gray-200  font-medium">
                                            How can I reset my password?
                                        </div>
                                        <div className="collapse-content">
                                            <p className="dark:text-gray-400">
                                                To reset your password, go to the login page and click on &quot;Forgot Password.&quot; Enter your registered email, and we will send you a link to reset your password.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Accordion Item 2 */}
                                    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-white dark:bg-gray-800 rounded-lg">
                                        <div className="collapse-title text-lg dark:text-gray-200 font-medium">
                                            Can I cancel my premium subscription anytime?
                                        </div>
                                        <div className="collapse-content">
                                            <p className="dark:text-gray-400">
                                                Yes, you can cancel your premium subscription at any time from your account settings. Your subscription will remain active until the end of your current billing cycle.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Accordion Item 3 */}
                                    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-white dark:bg-gray-800 rounded-lg">
                                        <div className="collapse-title text-lg dark:text-gray-200 font-medium">
                                            How do I contact customer support?
                                        </div>
                                        <div className="collapse-content">
                                            <p className="dark:text-gray-400">
                                                You can contact our customer support via the &quot;Help&quot; section on our website. Alternatively, you can email us at support@example.com or reach out through our live chat support.
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Become admin */}
            <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                        How to Become an Admin
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Follow these steps to apply for an admin role and take control of NewsDayLight’s content management.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Step 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-4xl text-blue-500 dark:text-blue-400 font-bold mb-3">1</div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Register & Verify</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Sign up and verify your email to access your dashboard.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-4xl text-blue-500 dark:text-blue-400 font-bold mb-3">2</div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Contribute Articles</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Publish high-quality articles and engage with the community.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-4xl text-blue-500 dark:text-blue-400 font-bold mb-3">3</div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Meet the Criteria</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Ensure your content meets platform guidelines and user engagement standards.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-4xl text-blue-500 dark:text-blue-400 font-bold mb-3">4</div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Apply for Admin Role</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Submit your admin application via your dashboard.
                            </p>
                        </div>

                        {/* Step 5 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-4xl text-blue-500 dark:text-blue-400 font-bold mb-3">5</div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Get Approved</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Our team reviews your application, and if approved, you gain admin privileges!
                            </p>
                        </div>
                    </div>

                    {/* <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition">
                        Apply Now
                    </button> */}
                </div>
            </section>

            <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Section Title */}
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                        How <span className="text-blue-500">NewsDayLight</span> Works
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                        Whether you&apos;re a reader, writer, or an aspiring journalist, NewsDayLight makes it easy to explore, create, and engage with news content.
                    </p>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <span className="text-4xl text-blue-500">📰</span>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">Browse News</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Discover trending and exclusive articles from trusted publishers and independent writers.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <span className="text-4xl text-green-500">✍️</span>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">Post Articles</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Sign up as a writer and share your insights, opinions, and reports with a global audience.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <span className="text-4xl text-red-500">⭐</span>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">Get Premium Access</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Subscribe for exclusive articles, in-depth analysis, and an ad-free reading experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;
