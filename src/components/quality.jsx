import React from 'react';
import PropTypes from 'prop-types';

export default function Quality({ name, color, _id }) {
  return (
    <div className={`badge d-inline bg-${color} m-1`} key={_id}>
      {name}
    </div>
  );
}
Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};
