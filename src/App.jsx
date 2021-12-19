import React, { useState } from 'react';
import Users from './components/users';
import api from './api';

export default function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleUserChange = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };
  const handleToggleBookmark = (id) => {
    setUsers((prevState) =>
      prevState.map((user) => (user._id !== id ? user : { ...user, bookmark: !user.bookmark }))
    );
  };
  return (
    <div className="container my-2">
      <Users
        users={users}
        // favourites={favourites}
        handleUserChange={handleUserChange}
        handleToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
