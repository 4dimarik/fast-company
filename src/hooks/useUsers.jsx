import React, { useContext, useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import userService from '../service/user.service';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';

const UserContext = React.createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users];
      const indexUser = newUsers.findIndex((u) => u._id === currentUser._id);
      newUsers[indexUser] = currentUser;
      setUsers(newUsers);
    }
  }, [currentUser]);

  useEffect(() => {
    if (error != null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setLoading(false);
    } catch (e) {
      errorCatcher(e);
    }
  }
  function errorCatcher(error) {
    console.log(error);
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  function getUserById(userId) {
    return users.find((user) => user._id === userId);
  }

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : <h1>Users loading ...</h1>}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]),
};

export default UserProvider;
