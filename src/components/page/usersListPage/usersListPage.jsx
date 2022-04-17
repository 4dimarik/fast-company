import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utilites';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import '@fortawesome/fontawesome-free/css/all.css';
import TextField from '../../common/form/textField';
import { useUsers } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfessions';
import { useAuth } from '../../../hooks/useAuth';

const UsersListPage = () => {
  const { users } = useUsers();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading: professionsLoading, professions } = useProfessions();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 8;

  const handleDelete = (userId) => {
    // setUsers((prevState) => prevState.filter((user) => user._id !== id));
    console.log(userId);
  };
  const handleToggleBookmark = (id) => {
    const newArray = users.map((user) =>
      user._id !== id ? user : { ...user, bookmark: !user.bookmark },
    );
    // setUsers((prevState) =>
    //   prevState.map((user) =>
    //     user._id !== id ? user : { ...user, bookmark: !user.bookmark },
    //   ),
    // );
    console.log(newArray);
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') setSearchQuery('');
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchQuery
        ? data.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
          )
        : selectedProf
        ? data.filter((user) => user.profession.name === selectedProf?.name)
        : data;
      return filteredUsers.filter((user) => user._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);
    const itemsCount = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };
    return (
      <div className="d-flex">
        {!professionsLoading && professions && (
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
          <TextField
            id="searchQuery"
            name="searchQuery"
            placeholder="searchQuery..."
            value={searchQuery}
            onChange={handleSearchQuery}
          />
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

export default UsersListPage;
