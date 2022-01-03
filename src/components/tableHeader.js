import React from 'react';
import PropTypes from 'prop-types';

function TableHeader({ onSort, selectedSort, columns }) {
  const handleSort = (item) => {
    if (selectedSort.iter === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onSort({ iter: item, order: 'asc' });
    }
  };
  return (
    <thead>
      <tr>
        <th onClick={() => handleSort('name')} scope="col">
          Имя
        </th>
        <th scope="col">Качества</th>
        <th onClick={() => handleSort('profession.name')} scope="col">
          Профессия
        </th>
        <th onClick={() => handleSort('completedMeetings')} scope="col">
          Встретился, раз
        </th>
        <th onClick={() => handleSort('rate')} scope="col">
          Оценка
        </th>
        <th onClick={() => handleSort('bookmark')} scope="col">
          Избранное
        </th>
        <th scope="col"> </th>
      </tr>
    </thead>
  );
}
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
