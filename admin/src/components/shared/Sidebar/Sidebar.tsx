import React from 'react';
import { Nav, Row, Col } from 'react-bootstrap';

import './styles.css';

const Sidebar: React.FC = () => {
    return (
        <Nav className="flex-column sidebar">
            <Nav.Link href="/">
                <Row>
                    <Col md={2}>
                        <i className="fas fa-home icon"></i>
                    </Col>

                    <Col>
                        <p className="text">Inicio</p>
                    </Col>
                </Row>
            </Nav.Link>

            <Nav.Link href="/users">
                <Row>
                    <Col md={2}>
                        <i className="fas fa-users icon"></i>
                    </Col>

                    <Col>
                        <p className="text">Usuarios</p>
                    </Col>
                </Row>
            </Nav.Link>
        </Nav>
    )
}

export default Sidebar;