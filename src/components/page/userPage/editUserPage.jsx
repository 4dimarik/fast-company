import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import EditUserForm from '../../ui/editUserForm';

const EditUserPage = () => {
  const { userId } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    api.users.getById(userId).then((user) => {
      const data = {};
      data.name = user.name;
      data.email = user.email;
      data.profession = user.profession._id;
      data.sex = user.sex;
      data.qualities = user.qualities.map(({ name: label, _id: value }) => ({
        label,
        value,
      }));
      setData(data);
    });
  }, []);

  if (data) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <EditUserForm userId={userId} user={data} />
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading</h1>;
};

EditUserPage.propTypes = {};

export default EditUserPage;
