import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/main/Home/Home';
import Settings from './components/main/Settings/Settings';
import Header from './components/shared/Header/Header';
import ProtectedRoute from './components/shared/ProtectedRoute/ProtectedRoute';
import { socket, SocketContext } from './core/contexts/socket';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="main-container">
          <Header />

          <Switch>
            <ProtectedRoute
              component={Settings}
              path='/settings'
            />

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
