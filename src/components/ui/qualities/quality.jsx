import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQualities';

const Quality = ({ id }) => {
  const { getQuality } = useQualities();
  const { name, color } = getQuality(id);
  return <div className={`badge d-inline bg-${color} m-1`}>{name}</div>;
};
Quality.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Quality;
