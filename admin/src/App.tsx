import React, { useEffect, useState } from 'react';
import './App.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Header from './components/shared/Header/Header';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/main/Home/Home';
import Users from './components/main/Users/Users';
import Entities from './components/main/Entities/Entities';
import Login from './components/main/Login/Login';
import { ICredential } from './core/interfaces/IUsers';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<ICredential | null>(null);

  useEffect(() => {
    (async () => {
      await getToken();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getToken();
    })();
  }, [user]);

  const getToken = async () => {
    const data = localStorage.getItem('token');

    if (data && data !== '') {
      setToken(data);
    } else {
      setToken(null);
    }
  }

  const userLoggedIn = (token: string, user: ICredential) => {
    localStorage.setItem('token', token);

    setUser(user);
  }

  const logOut = () => {
    localStorage.removeItem('token');

    setUser(null);

    getToken();
  }

  return (
    <div className="main-container">
      {
        !token &&
        <Login
          userLogguedIn={(token: string, user: ICredential) => userLoggedIn(token, user)}
        />
      }

      {
        token &&
        <Router>
          <Header
            logOut={logOut}
          />

          <Container>
            <Row>
              <Col md={2}>
                <Sidebar />
              </Col>

              <Col>
                <Switch>
                  <Route path="/users" component={Users} />
                  <Route path="/entities" component={Entities} />
                  <Route exact path="/" component={Home} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      }
    </div>
  );
}

export default App;
