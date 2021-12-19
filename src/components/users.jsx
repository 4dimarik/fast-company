import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utilites';
import GroupList from './groupList';
import api from '../api/index';
import SearchStatus from './searchStatus';

export default function Users({ users: allUsers, handleUserChange, handleToggleBookmark }) {
  const pageSize = 2;

  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const filtersUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers;
  const itemsCount = filtersUsers.length;
  const userCrop = paginate(filtersUsers, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedProf();
  };
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button type="button" className="btn btn-secondary mt-2" onClick={() => clearFilter()}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus usersCount={itemsCount} />
        {itemsCount > 0 && (
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
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired,
};
