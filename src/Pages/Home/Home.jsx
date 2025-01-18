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

const Home = () => {
    const axiosPublic = useAxiosPublic();

    const [publishers] = useAllPublisher();

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
                            <CountUp end={usersCount?.allUserCount} duration={5}/>
                        </div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title">Normal User</div>
                        <div className="stat-value">
                            <CountUp end={usersCount?.normalUsersCount} duration={5}/>
                        </div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title">Premium User</div>
                        <div className="stat-value">
                            <CountUp end={usersCount?.premiumUsersCount} duration={5}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
