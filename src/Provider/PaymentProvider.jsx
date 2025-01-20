import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const PaymentContext = createContext();
const PaymentProvider = ({children}) => {
    const [paymentInformation, setPaymentInformation] = useState('');


    const payInfo = {
        paymentInformation,
        setPaymentInformation
    }

    return (
        <PaymentContext.Provider value={payInfo}>
            {
                children
            }
        </PaymentContext.Provider>
    );
};

PaymentProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default PaymentProvider;