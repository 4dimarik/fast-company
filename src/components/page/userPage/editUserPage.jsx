import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormComponent from '../../common/form';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import BackHistoryButton from '../../common/backButton';
import { useAuth } from '../../../hooks/useAuth';
import { useProfessions } from '../../../hooks/useProfessions';
import { useSelector } from 'react-redux';
import {
  getQualities,
  getQualitiesLoadingStatus,
} from '../../../store/qualities';
const EditUserPage = () => {
  const history = useHistory();
  const { currentUser, updateUserData } = useAuth();
  const [data, setData] = useState(currentUser);
  const [isLoading, setLoading] = useState(true);
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));
  const { isLoading: professionsLoading, professions } = useProfessions();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  useEffect(() => {
    if (!qualitiesLoading) {
      setData((prevState) => ({
        ...prevState,
        qualities: getQualitiesOptions(),
      }));
    }
  }, [qualitiesLoading]);
  useEffect(() => {
    if (!qualitiesLoading && !professionsLoading) {
      setLoading(false);
    }
  }, [qualitiesLoading, professionsLoading]);

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

  const getQualitiesOptions = () => {
    return currentUser.qualities
      ? qualitiesList.filter((q) => currentUser.qualities.includes(q.value))
      : [];
  };

  const handleSubmit = async (data) => {
    await updateUserData({
      ...data,
      qualities: data.qualities.map((q) => q.value),
    });
    history.push(`/users/${currentUser._id}`);
  };

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && (
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
                options={professionsList}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' },
                ]}
                name="sex"
                label="Выберите ваш пол "
              />
              <MultiSelectField
                options={qualitiesList}
                defaultValue={getQualitiesOptions()}
                name="qualities"
                label="Выберите ваши качества"
              />
              <button type="submit" className="btn btn-primary w-100 mx-auto">
                Submit
              </button>
            </FormComponent>
          )}
        </div>
      </div>
    </div>
  );
};

EditUserPage.propTypes = {};

export default EditUserPage;
