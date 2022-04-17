import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities();
  if (!isLoading && qualities) {
    return (
      <>
        {qualities.map((quality) => (
          <Quality key={quality} id={quality} />
        ))}
      </>
    );
  } else {
    return '';
  }
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesList;
