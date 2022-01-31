import React, { useEffect, useState } from 'react';
import validator from '../../utils/validator';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false,
  });
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
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
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' },
    },
    licence: {
      isRequired: {
        message:
          'Вы не можите использовать наш сервис без использования лицензионного соглашения',
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

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidForm = validate();
  };

  return (
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
      <SelectField
        label="Выберите вашу профессию"
        name="profession"
        value={data.profession}
        error={errors.profession}
        defaultOption="Choose..."
        options={professions}
        onChange={handleChange}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол "
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckBoxField
        onChange={handleChange}
        name="licence"
        value={data.licence}
        error={errors.licence}
      >
        Подтвержить <a> лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValidForm}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
