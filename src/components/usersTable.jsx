import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDelete,
}) => {
  const renderBookmarkComponent = (user) => (
    <Bookmark
      status={user.bookmark}
      onClick={() => onToggleBookMark(user._id)}
    />
  );
  const renderQualitiesListComponent = (user) => (
    <QualitiesList qualities={user.qualities} />
  );
  const renderLinkComponent = (user) => (
    <Link className="nav-link" to={`/users/${user._id}`}>
      {user.name}
    </Link>
  );
  const columns = {
    // name: { path: 'name', name: 'Имя' },
    name: { name: 'Имя', component: renderLinkComponent },
    qualities: { name: 'Качества', component: renderQualitiesListComponent },
    professions: { path: 'profession.name', name: 'Качества' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: renderBookmarkComponent,
    },
    delete: {
      // eslint-disable-next-line react/no-unstable-nested-components
      component: (user) => (
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(user._id)}
        >
          Удалить
        </button>
      ),
    },
  };
  return (
    <Table>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
    </Table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UsersTable;
