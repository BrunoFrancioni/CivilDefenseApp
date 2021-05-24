import React from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';

import './styles.css';

const Header: React.FC = () => {
    return (
        <div className="header-container">
            <Container>
                <Row>
                    <Col lg={11}>
                        <Nav>
                            <Nav.Link href="/">
                                <div className="logo-title-container">
                                    <div>
                                        <img src="Defensa-Civil-logo.png" alt="logo" className="logo" />
                                    </div>

                                    <div>
                                        <p className="title">Defensa Civil Administrador</p>
                                    </div>
                                </div>
                            </Nav.Link>
                        </Nav>
                    </Col>

                    <Col>
                        <Button variant="danger" size="lg" className="button-salir float-end">Salir</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header;