import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import validator from '../../utils/validator';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';

const EditUserForm = ({ userId, user }) => {
  const [data, setData] = useState({ ...user });
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    const { name, value } = target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validatorConfig = {
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' },
    },
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Email введен не корректно' },
    },
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' },
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

  const objectToArray = (object) => {
    return Object.keys(object).map((key) => object[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidForm = validate();
    if (isValidForm) {
      const userData = { ...data };
      userData.profession = objectToArray(professions).find(
        ({ _id }) => _id === data.profession
      );

      userData.qualities = data.qualities.map(
        (quality) =>
          objectToArray(qualities).filter(
            (item) => item._id === quality.value
          )[0],
        []
      );
      api.users.update(userId, userData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        id="name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Электронная почта"
        id="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
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
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
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
EditUserForm.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};

export default EditUserForm;
