import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../../api';
import QualitiesList from '../../ui/qualities/qualitiesList';

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleUsers = () => {
    history.push(`/users/${userId}/edit`);
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
          Изменить
        </button>
      </div>
    );
  }
  return 'Loading...';
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
