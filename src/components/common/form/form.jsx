import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import validator from '../../../utils/validator';

const FormComponent = ({
  children,
  validatorConfig,
  defaultData,
  onSubmit,
  isClear = false,
}) => {
  const [data, setData] = useState(defaultData || {});
  const [errors, setErrors] = useState({});

  const handleChange = useCallback(({ name, value }) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  }, []);
  const validate = useCallback(
    (data) => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [validatorConfig],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(data);
    if (!isValid) return;
    if (isClear) setData({});
    onSubmit(data);
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      validate(data);
    }
  }, [data]);

  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const form = event.target.form;
      const indexField = Array.prototype.indexOf.call(form, event.target);
      form.elements[indexField + 1].focus();
    }
  }, []);

  const isValid = Object.keys(errors).length === 0;

  const clonedElements = React.Children.map(children, (child) => {
    const childType = typeof child.type;
    let config = {};
    if (childType === 'object') {
      if (!child.props.name)
        throw new Error(
          'Name property is required for field component, ' +
            JSON.stringify(child.props),
        );

      config = {
        ...child.props,
        onChange: handleChange,
        value: child.props?.value ?? data[child.props.name],
        error: errors[child.props.name],
        onKeyDown: handleKeyDown,
      };
    }
    if (childType === 'string') {
      if (child.type === 'button') {
        if (child.props.type === 'submit' || child.props.type === undefined) {
          config = { ...child.props, disabled: !isValid };
        }
      }
    }
    return React.cloneElement(child, config);
  });
  return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};

FormComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  validatorConfig: PropTypes.object,
  defaultData: PropTypes.object,
  onSubmit: PropTypes.func,
  isClear: PropTypes.bool,
};

export default FormComponent;
