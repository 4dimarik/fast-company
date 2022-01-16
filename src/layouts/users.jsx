import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Pagination from '../components/pagination';
import { paginate } from '../utilites';
import GroupList from '../components/groupList';
import api from '../api';
import SearchStatus from '../components/searchStatus';
import UsersTable from '../components/usersTable';
import '@fortawesome/fontawesome-free/css/all.css';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });

  const pageSize = 8;

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };
  const handleToggleBookmark = (id) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user._id !== id ? user : { ...user, bookmark: !user.bookmark }
      )
    );
  };

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

  if (users) {
    const filtersUsers = selectedProf
      ? users.filter((user) => user.profession.name === selectedProf.name)
      : users;
    const itemsCount = filtersUsers.length;
    const sortedUsers = _.orderBy(filtersUsers, [sortBy.path], [sortBy.order]);
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
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookmark}
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
  return 'Loading...';
};

export default Users;
