import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import MainPage from './layouts/main';
import Login from './layouts/login';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfessions';
import { QualitiesProvider } from './hooks/useQualities';

const App = () => {
  return (
    <div className="container-fluid my-2">
      <NavBar />
      <Switch>
        <QualitiesProvider>
          <ProfessionProvider>
            <Route exact path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/" component={MainPage} />
            <Redirect to="/" />
          </ProfessionProvider>
        </QualitiesProvider>
      </Switch>
      <ToastContainer />
    </div>
  );
};
export default App;
