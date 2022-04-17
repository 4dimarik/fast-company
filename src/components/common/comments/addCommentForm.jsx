import React, { useState } from 'react';
import TextAreaField from '../form/textAreaField';
import PropTypes from 'prop-types';
import FormComponent from '../form';

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});

  const validatorConfig = {
    content: {
      isRequired: {
        message: 'Сообщение не может быть пустым',
      },
    },
  };

  const clearForm = () => {
    setData({});
  };
  const handleSubmit = (data) => {
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>New comment</h2>
      <FormComponent
        onSubmit={handleSubmit}
        validatorConfig={validatorConfig}
        defaultData={data}
        isClear={true}
      >
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
