import React from 'react';

const Heading = ({ text }) => {
    return (
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800">
            {text.toUpperCase()}
        </h1>
    );
};

export default Heading;
