import React, { useState } from 'react';
import { Nav, Row, Col } from 'react-bootstrap';

import './styles.css';

const Sidebar: React.FC = () => {
    let [activeWindow, setActiveWindow] = useState<string>(window.location.pathname);

    return (
        <Nav className="flex-column sidebar">
            <Nav.Link href="/">
                <Row>
                    <Col md={2}>
                        <i className="fas fa-home icon"></i>
                    </Col>

                    <Col>
                        <p
                            className={`text ${activeWindow === '/' ? "active" : ""}`}
                        >Inicio</p>
                    </Col>
                </Row>
            </Nav.Link>

            <Nav.Link href="/users">
                <Row>
                    <Col md={2}>
                        <i className="fas fa-users icon"></i>
                    </Col>

                    <Col>
                        <p
                            className={`text ${activeWindow === '/users' ? "active" : ""}`}
                        >Usuarios</p>
                    </Col>
                </Row>
            </Nav.Link>

            <Nav.Link href="/entities">
                <Row>
                    <Col md={2}>
                        <i className="fas fa-building icon"></i>
                    </Col>

                    <Col>
                        <p
                            className={`text ${activeWindow === '/entities' ? "active" : ""}`}
                        >Entidades</p>
                    </Col>
                </Row>
            </Nav.Link>
        </Nav>
    )
}

export default Sidebar;