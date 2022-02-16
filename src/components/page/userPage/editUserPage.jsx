import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../../api';
import FormComponent from '../../common/form';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import BackHistoryButton from '../../common/backButton';
const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const [professions, setProfession] = useState([]);
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: qualities.map(({ name: label, _id: value }) => ({
          label,
          value,
        })),
        profession: profession._id,
      })),
    );
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

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
  const objectToArray = (object) => {
    return Object.keys(object).map((key) => object[key]);
  };
  const getProfessionById = (id) => {
    return objectToArray(professions).find(({ _id }) => _id === id);
  };

  const getQualities = (userQualities) => {
    return userQualities.map(
      (quality) =>
        objectToArray(qualities).filter(
          (item) => item._id === quality.value,
        )[0],
      [],
    );
  };

  const handleSubmit = (data) => {
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => history.push(`/users/${data._id}`));
    console.log(data);
  };

  if (data) {
    return (
      <div className="container mt-5">
        <BackHistoryButton />
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {isLoading && Object.keys(professions).length > 0 ? (
              <FormComponent
                onSubmit={handleSubmit}
                validatorConfig={validatorConfig}
                defaultData={data}
              >
                <TextField label="Имя" name="name" autoFocus />
                <TextField label="Электронная почта" name="email" />
                <SelectField
                  label="Выберите вашу профессию"
                  name="profession"
                  defaultOption="Choose..."
                  options={professions}
                />
                <RadioField
                  options={[
                    { name: 'Male', value: 'male' },
                    { name: 'Female', value: 'female' },
                    { name: 'Other', value: 'other' },
                  ]}
                  value={data.sex}
                  name="sex"
                  label="Выберите ваш пол "
                />
                <MultiSelectField
                  options={qualities}
                  defaultValue={data.qualities}
                  name="qualities"
                  label="Выберите ваши качества"
                />
                <button type="submit" className="btn btn-primary w-100 mx-auto">
                  Submit
                </button>
              </FormComponent>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading</h1>;
};

EditUserPage.propTypes = {};

export default EditUserPage;
