import PropTypes from "prop-types";

const PublisherCard = ({publisher}) => {
    return (
        <div className="p-6 w-full shadow-xl border rounded-md">
            <div className="flex gap-3 items-center ">
                <img className="w-14 h-14 rounded-full object-cover" src={publisher.logo} alt="" />
                <h1 className="text-xl font-bold"> {publisher.publisherName}</h1>
            </div>
        </div>
    );
};

PublisherCard.propTypes = {
    publisher : PropTypes.object
}

export default PublisherCard;