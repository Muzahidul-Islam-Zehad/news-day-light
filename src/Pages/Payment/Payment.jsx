import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../../Provider/PaymentProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { BsBrightnessHighFill } from "react-icons/bs";

const Payment = () => {
    const navigate = useNavigate();
    const { paymentInformation } = useContext(PaymentContext);
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState(null);
    const [amount, setAmount] = useState(null);
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const { user , setSubscribed, darkMode} = useAuth();

    useEffect(() => {
        if (!paymentInformation) {
            navigate('/subscription');
        }
        else {
            setDuration(parseInt(paymentInformation.split(' ')[0]));
            setAmount(parseInt(paymentInformation.split(' ')[1]));
        }
    }, [paymentInformation, navigate]);


    // console.log(duration, amount);

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axiosSecure.post('/create-payment-intent', { amount });
            // console.log('secret : ',clientSecret);
            const clientSecret = data.clientSecret;

            const card = elements.getElement(CardElement);

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                },

            })

            if (error) {
                setLoading(false);
                console.log(error);
            }
            if (paymentIntent) {

                // console.log(paymentIntent);

                const sendDataToDatabase = {
                    email: user.email,
                    time: duration
                }
                await axiosSecure.patch('/make-premium-user', sendDataToDatabase);

                navigate('/all-articles')
                toast.success('successful');
                setSubscribed(true);
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }


    const cardStyle = {
        style: {
          base: {
            backgroundColor: darkMode ? "#374151" : "#ffffff", // bg-gray-700 for dark, white for light
            color: darkMode ? "#ffffff" : "#000000", // White text in dark mode, black in light mode
            fontSize: "16px",
            "::placeholder": {
              color: darkMode ? "#9CA3AF" : "#6B7280", // text-gray-400 for dark, text-gray-600 for light
            },
            padding: "12px",
            borderRadius: "8px",
            border: `1px solid ${darkMode ? "#4B5563" : "#D1D5DB"}`, // border-gray-600 for dark, border-gray-300 for light
          },
          invalid: {
            color: "#EF4444", // Red-500 for invalid input
          },
        },
      };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md dark:bg-gray-800 dark:shadow-gray-600">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6 dark:text-gray-200">Total Payment Amount</h1>
                <div className="flex justify-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400">${amount}</h2>
                </div>
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <CardElement options={cardStyle}/>
                    </div>
                    <button
                        disabled={!stripe || !elements || loading}
                        type="submit"
                        className="w-full btn btn-primary mt-4"
                    >
                        {
                            loading ?
                                <span className="text-xl animate-spin dark:text-white"><BsBrightnessHighFill /></span>
                                :
                                `Pay $${amount}`
                        }
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Payment;