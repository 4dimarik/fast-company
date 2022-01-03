import React, { useEffect, useState } from 'react';
import Users from './components/users';
import api from './api';

export default function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };
  const handleToggleBookmark = (id) => {
    setUsers((prevState) =>
      prevState.map((user) => (user._id !== id ? user : { ...user, bookmark: !user.bookmark }))
    );
  };
  return (
    <div className="container-fluid my-2">
      {users && (
        <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookmark} />
      )}
    </div>
  );
}
