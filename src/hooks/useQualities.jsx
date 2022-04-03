import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import qualityService from '../service/quality.service';
import PropsTypes from 'prop-types';

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    };
    getQualities();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setErrors(message);
  }

  useEffect(() => {
    if (errors != null) {
      toast.error(errors);
      setErrors(null);
    }
  }, [errors]);

  return (
    <QualitiesContext.Provider
      value={{
        isLoading,
        qualities,
        getQuality,
      }}
    >
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]),
};
