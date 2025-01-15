import PropTypes from "prop-types";

const PageHeading = ({title, subtitle}) => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1A202C] uppercase">{title}</h1>
            <p className="text-lg italic mt-1 text-[#4A5568]">{subtitle}</p>
        </div>
    );
};

PageHeading.propTypes = {
    title : PropTypes.string,
    subtitle: PropTypes.string,
}

export default PageHeading;