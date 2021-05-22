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
import Entities from './components/main/Entities/Entities';

function App() {
  return (
    <div className="main-container">
      <Header />

      <Container>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>

          <Col>
            <Router>
              <Route path="/users" component={Users} />
              <Route path="/entities" component={Entities} />
              <Route exact path="/" component={Home} />
            </Router>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
