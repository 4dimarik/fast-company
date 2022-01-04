import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import Bookmark from './bookmark';

const User_ = ({
  _id,
  name,
  qualities,
  profession,
  rate,
  bookmark,
  completedMeetings,
  onDelete,
  onToggleBookMark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{`${rate}/5`}</td>
      <td>
        <Bookmark status={bookmark} onClick={() => onToggleBookMark(_id)} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(_id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

User_.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool,
  onToggleBookMark: PropTypes.func.isRequired,
};
export default User_;
