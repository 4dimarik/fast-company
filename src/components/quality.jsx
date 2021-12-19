import React from 'react';
import PropTypes from 'prop-types';

export default function Quality({ quality }) {
  return <div className={`badge d-inline bg-${quality.color} m-1`}>{quality.name}</div>;
}
Quality.propTypes = {
  quality: PropTypes.object.isRequired,
};
