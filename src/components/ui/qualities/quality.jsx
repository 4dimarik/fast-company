import React from 'react';
import PropTypes from 'prop-types';

const Quality = ({ _id, color, name }) => {
  return <div className={`badge d-inline bg-${color} m-1`}>{name}</div>;
};
Quality.propTypes = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string,
};

export default Quality;
