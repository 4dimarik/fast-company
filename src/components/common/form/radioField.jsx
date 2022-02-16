import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({ options, name, onChange, value, label, ...rest }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options.map((option) => (
          <div
            key={`${option.name}_${option.value}`}
            className="form-check form-check-inline"
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${option.name}_${option.value}`}
              value={option.value}
              checked={option.value === value}
              onChange={handleChange}
              {...rest}
            />
            <label
              className="form-check-label"
              htmlFor={`${option.name}_${option.value}`}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

RadioField.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default React.memo(RadioField);
