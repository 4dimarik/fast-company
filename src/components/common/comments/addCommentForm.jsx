import React, { useEffect, useState } from 'react';
import API from '../../../api';
import SelectField from '../form/selectField';
import TextAreaField from '../form/textAreaField';
import PropTypes from 'prop-types';
import FormComponent from '../form';
const initialData = { userId: '', content: '' };

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
  const [setErrors] = useState({});

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Выберите от чьего имени вы хотите отправить сообщение',
      },
    },
    content: {
      isRequired: {
        message: 'Сообщение не может быть пустым',
      },
    },
  };

  useEffect(() => {
    API.users.fetchAll().then(setUsers);
  }, []);
  const clearForm = () => {
    setData(initialData);
    setErrors({});
  };
  const handleSubmit = (data) => {
    console.log('sub', data);
    onSubmit(data);
    clearForm();
  };
  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      name: users[userId].name,
      value: users[userId]._id,
    }));
  return (
    <div>
      <h2>New comment</h2>
      <FormComponent
        onSubmit={handleSubmit}
        validatorConfig={validatorConfig}
        defaultData={data}
      >
        <SelectField
          options={arrayOfUsers}
          name="userId"
          defaultOption="Выберите пользователя"
        />
        <TextAreaField name="content" label="Сообщение" />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </FormComponent>
    </div>
  );
};
AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddCommentForm;
