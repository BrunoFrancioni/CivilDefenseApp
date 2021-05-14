import React from 'react';
import './App.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Header from './components/shared/Header/Header';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/main/Home/Home';
import Users from './components/main/Users/Users';

function App() {
  return (
    <>
      <Header />

      <Container>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>

          <Col>
            <Router>
              <Route path="/users" component={Users} />
              <Route exact path="/" component={Home} />
            </Router>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
