import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from '../common/table';
import Bookmark from '../common/bookmark';
import Qualities from './qualities';
import Profession from './profession';

const UsersTable = ({ users, onSort, selectedSort, onToggleBookMark }) => {
  const renderBookmarkComponent = (user) => (
    <Bookmark
      status={user.bookmark}
      onClick={() => onToggleBookMark(user._id)}
    />
  );
  const renderQualitiesListComponent = (user) => (
    <Qualities qualities={user.qualities} />
  );
  const renderLinkComponent = (user) => (
    <Link className="nav-link" to={`/users/${user._id}`}>
      {user.name}
    </Link>
  );
  const renderProfessionComponent = (user) => (
    <Profession id={user.profession} />
  );
  const columns = {
    name: { name: 'Имя', component: renderLinkComponent },
    qualities: { name: 'Качества', component: renderQualitiesListComponent },
    professions: {
      name: 'Профессия',
      component: renderProfessionComponent,
    },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: renderBookmarkComponent,
    },
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
};

export default UsersTable;
