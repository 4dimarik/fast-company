import React, { useEffect, useState } from 'react';
import validator from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useProfessions } from '../../hooks/useProfessions';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getQualities } from '../../store/qualities';
const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    name: '',
    qualities: [],
    licence: false,
  });
  const { singUp } = useAuth();
  const qualities = useSelector(getQualities());
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));
  const { professions } = useProfessions();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
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
    name: {
      isRequired: { message: 'Имя обязательна для заполнения' },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3,
      },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    try {
      await singUp(newData);
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
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
        label="Имя"
        id="name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
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
        options={professionsList}
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
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
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
