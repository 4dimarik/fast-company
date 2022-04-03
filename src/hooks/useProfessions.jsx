import React, { useContext, useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { toast } from 'react-toastify';
import professionService from '../service/profession.service';

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (error != null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  function getProfession(id) {
    return professions.find((item) => item._id === id);
  }

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (e) {
      errorCatcher(e);
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]),
};
