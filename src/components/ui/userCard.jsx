import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
const UserCard = ({ user }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const handleClick = () => {
    history.push(history.location.pathname + '/edit');
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUser._id === user._id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={handleClick}
          >
            <i className="fas fa-lg fa-cog" />
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={user.image} className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i
                className="fas fa-caret-down fa-lg text-primary"
                role="button"
              />
              <i
                className="fas fa-caret-up fa-lg text-secondary"
                role="button"
              />
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
