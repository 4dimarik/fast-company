import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import MainPage from './layouts/main';
import Login from './layouts/login';
import UserPage from './components/page/userPage/userPage';

const App = () => {
  return (
    <div className="container-fluid my-2">
      <NavBar />
      <Route exact path="/" component={MainPage} />
      <Route path="/login/:type?" component={Login} />
      <Route path="/users/*" component={UserPage} />
      <Route exact path="/users" component={Users} />
    </div>
  );
};

export default App;
