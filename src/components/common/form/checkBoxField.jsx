import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name, value: !value });
  };
  const getInputClasses = () => {
    return `form-check-input${error ? ' is-invalid' : ''}`;
  };
  return (
    <div className="mb-4">
      <div className="form-check">
        <input
          className={getInputClasses()}
          type="checkbox"
          name={name}
          id={name}
          onChange={handleChange}
          checked={value}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default CheckBoxField;
