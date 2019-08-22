import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { children, disabled } = props;
  return (
    <button className="btn" disabled={disabled} type="submit">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  disabled: PropTypes.bool
};

export default Button;
