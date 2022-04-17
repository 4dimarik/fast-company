import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import MainPage from './layouts/main';
import Login from './layouts/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfessionProvider } from './hooks/useProfessions';
import { QualitiesProvider } from './hooks/useQualities';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';

const App = () => {
  return (
    <div className="container-fluid my-2">
      <AuthProvider>
        <NavBar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={MainPage} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>

      <ToastContainer />
    </div>
  );
};
export default App;
