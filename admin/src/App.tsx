import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, useHistory, Redirect } from 'react-router-dom';
import Home from './components/main/Home/Home';
import Users from './components/main/Users/Users';
import Entities from './components/main/Entities/Entities';
import Login from './components/main/Login/Login';
import { ICredential } from './core/interfaces/IUsers';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './components/store/store';
import { logInAction } from './components/store/user/user.slice';
import ProtectedRoute from './components/shared/ProtectedRoute/ProtectedRoute';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const userLoggedIn = (token: string, user: ICredential) => {
    localStorage.setItem('token', token);

    dispatch(logInAction({ logged: true, info: user }));

    return <Redirect to="/" />
  }

  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route path='/login'>
            <Login
              userLogguedIn={(token: string, user: ICredential) => userLoggedIn(token, user)}
              userLogged={user.logged}
            />
          </Route>

          <ProtectedRoute
            component={Users}
            path='/users'
          />

          <ProtectedRoute
            component={Entities}
            path='/entities'
          />

          <ProtectedRoute
            component={Home}
            path='/'
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
