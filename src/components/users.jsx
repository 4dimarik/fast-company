import React, { useState } from 'react';
import PropTypes from 'prop-types';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utilites';

export default function Users({ users, handleUserChange, handleToggleBookmark }) {
  const itemsCount = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    itemsCount > 0 && (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User
                key={user._id}
                user={user}
                onDelete={handleUserChange}
                handleToggleBookmark={handleToggleBookmark}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={itemsCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    )
  );
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired,
};
