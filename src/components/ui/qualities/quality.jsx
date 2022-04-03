import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQualities';

const Quality = ({ id }) => {
  const { getQuality } = useQualities();
  const { name, color, _id } = getQuality(id);
  return (
    <div className={`badge d-inline bg-${color} m-1`} key={_id}>
      {name}
    </div>
  );
};
Quality.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Quality;
