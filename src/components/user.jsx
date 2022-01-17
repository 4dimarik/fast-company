import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../api';
import QualitiesList from './qualitiesList';

const User = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const id = useParams()[0];

  api.users.getById(id).then((data) => {
    setUser(data);
  });

  const handleUsers = () => {
    history.push('/users');
  };

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user?.profession?.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h3>Rate: {user.rate}</h3>
        <button
          type="button"
          onClick={() => {
            handleUsers();
          }}
        >
          Все Пользователи
        </button>
      </div>
    );
  }
  return 'Loading...';
};

User.propTypes = {};

export default User;
