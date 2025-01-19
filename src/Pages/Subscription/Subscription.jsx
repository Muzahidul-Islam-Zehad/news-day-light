import { useContext, useState } from "react";
import PageHeading from "../../Components/SharedComponents/PageHeading";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../../Provider/PaymentProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Subscription = () => {
    const [selected, setSelected] = useState('');
    const { setPaymentInformation } = useContext(PaymentContext);
    const {user} = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data } = useQuery({
        queryKey: ['is-Subscribed'],
        enabled: !!user.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/isPremium?email=${user.email}`);
            return data;
        }
    })


    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (!selected) {
            return;
        }

        setPaymentInformation(selected);
        console.log('submited');
        navigate('/payment')
    }


    return (
        <div className="bg-slate-100 py-10">
            <div className="w-11/12 mx-auto">
                <div>
                    <PageHeading title={'subscription'} subtitle={'Become a premium user'}></PageHeading>
                </div>


                <div className="mt-6 relative bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-16 px-6 lg:py-24 lg:px-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                            Exclusive Subscription Plans
                        </h2>
                        <p className="mt-4 text-lg md:text-xl">
                            Choose a plan that fits your needs and unlock the best features we offer.
                            Get unlimited access, premium articles, and more!
                        </p>
                    </div>

                    {/* Decorative Shapes */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="w-80 h-80 bg-purple-300 opacity-30 rounded-full blur-3xl absolute top-5 left-10"></div>
                        <div className="w-60 h-60 bg-indigo-300 opacity-20 rounded-full blur-2xl absolute bottom-10 right-10"></div>
                    </div>
                </div>

                <div className=" mt-6 flex justify-center items-center border p-10 w-11/12 md:w-3/4 lg:w-2/5 mx-auto bg-white shadow-lg">
                    {
                        data
                            ?

                            <div>
                                <h1>You Hava Alredy Became A Premium User</h1>
                            </div>
                            :
                            <form onSubmit={handleOnSubmit} className="">
                                <h1 className="text-xl font-bold text-center mb-4 ">Choose A Plan</h1>
                                <select value={selected} onChange={(e) => setSelected(e.target.value)} className="select select-bordered w-full max-w-xs bg-slate-100">
                                    <option disabled value=''>Choose a Plan</option>
                                    <option value='60 1'>1 Minute ($1)</option>
                                    <option value='432000 5'>5 Days ($5)</option>
                                    <option value='864000 10'>10 Days ($10)</option>
                                </select>
                                <button className="btn btn-primary mt-4 " type="submit">
                                    Payment
                                </button>
                            </form>
                    }

                </div>
            </div>
        </div>
    );
};

export default Subscription;