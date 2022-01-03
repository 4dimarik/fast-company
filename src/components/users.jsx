import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from './pagination';
import { paginate } from '../utilites';
import GroupList from './groupList';
import api from '../api/index';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';

export default function Users({ users: allUsers, ...rest }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });

  const pageSize = 8;

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
  const handleSort = (item) => {
    setSortBy(item);
  };
  const filtersUsers = selectedProf
    ? allUsers.filter((user) => user.profession.name === selectedProf.name)
    : allUsers;
  const itemsCount = filtersUsers.length;
  const sortedUsers = _.orderBy(filtersUsers, [sortBy.iter], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);
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
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={() => clearFilter()}
          >
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus usersCount={itemsCount} />
        {itemsCount > 0 && (
          <UsersTable
            users={userCrop}
            onSort={handleSort}
            currentSort={sortBy}
            {...rest}
          />
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
};
