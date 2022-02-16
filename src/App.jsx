import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import MainPage from './layouts/main';
import Login from './layouts/login';

const App = () => {
  return (
    <div className="container-fluid my-2">
      <NavBar />
      <Switch>
        <Route exact path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
export default App;
