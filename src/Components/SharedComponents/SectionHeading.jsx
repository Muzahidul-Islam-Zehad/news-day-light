import PropTypes from "prop-types";

const SectionHeading = ({title, subtitle}) => {
    return (
        <div className="text-center">
            <h1 className="text-2xl uppercase font-semibold text-[#2D3748]">{title}</h1>
            <p className="text-sm font-light mt-1 text-[#718096]">{subtitle}</p>
        </div>
    );
};

SectionHeading.propTypes = {
    title : PropTypes.string,
    subtitle: PropTypes.string,
}

export default SectionHeading;