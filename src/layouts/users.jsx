import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Pagination from '../components/pagination';
import { paginate } from '../utilites';
import GroupList from '../components/groupList';
import api from '../api';
import SearchStatus from '../components/searchStatus';
import UsersTable from '../components/usersTable';
import '@fortawesome/fontawesome-free/css/all.css';
import TextField from '../components/textField';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const [searchStr, setSearchStr] = useState('');
  const [filter, setFilter] = useState();

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

  const handleSearch = ({ target }) => {
    const { value } = target;
    setSearchStr(value);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setFilter({ type: 'profession', value: selectedProf });
    setCurrentPage(1);
  }, [selectedProf]);
  useEffect(() => {
    setFilter({ type: 'search', value: searchStr });
  }, [searchStr]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  const filterUsers = (users, filter) => {
    switch (filter.type) {
      case 'profession': {
        return users.filter(
          (user) => user.profession.name === filter.value?.name
        );
      }
      case 'search': {
        const result =
          filter.value !== ''
            ? users.filter((user) =>
                user.name
                  .toLowerCase()
                  .includes(filter.value.trim().toLowerCase())
              )
            : users;
        return result.length === 0 ? users : result;
      }
      default:
        return users;
    }
  };

  if (users) {
    const filtersUsers = filter.value ? filterUsers(users, filter) : users;
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
            <>
              <TextField
                id="search"
                name="search"
                placeholder="Search..."
                value={searchStr}
                onChange={handleSearch}
              />
              <UsersTable
                users={userCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookmark}
              />
            </>
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
