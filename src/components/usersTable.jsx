import React from 'react';
import PropTypes from 'prop-types';
import User from './user';

function UsersTable({ users, onSort, currentSort, ...rest }) {
  return (
    <table className="table">
      <tbody>
        {users.map((user) => (
          <User key={user._id} {...user} {...rest} />
        ))}
      </tbody>
    </table>
  );
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired,
};

export default UsersTable;
