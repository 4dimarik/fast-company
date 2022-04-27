import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQualitiesLoadingStatus,
  getQualitiesByIds,
  loadQualitiesList,
} from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  if (qualitiesLoading) return 'Loading...';
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);
  if (!qualitiesLoading && qualities) {
    return (
      <>
        {qualitiesList.map((quality) => (
          <Quality key={quality._id} {...quality} />
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
