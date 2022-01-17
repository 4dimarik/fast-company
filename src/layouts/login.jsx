import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '../components/textField';
import validator from '../utils/validator';

const Login = (props) => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Email введен не корректно' },
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру',
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8,
      },
    },
  };

  const validate = () => {
    const _errors = validator(data, validatorConfig);
    validator(data, validatorConfig);
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  const isValidForm = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Электронная почта"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />

            <TextField
              label="Пароль"
              type="password"
              id="password"
              name="password"
              value={data.password}
              error={errors.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={!isValidForm}
              className="btn btn-primary w-100 mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
