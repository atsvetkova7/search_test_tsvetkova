import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
    const {
        onChange,
        placeholder,
        value
    } = props;
    return (
        <input
            className="input"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
        />
    )
}

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string
}

export default Input
