import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';

export default function App() {
  const [users, setUsers] = useState(api.users.default());
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
      <SearchStatus usersCount={users.length} />
      <Users
        users={users}
        // favourites={favourites}
        handleUserChange={handleUserChange}
        handleToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
