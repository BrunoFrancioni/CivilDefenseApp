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
                                <Row>
                                    <Col>
                                        <img src="ico-herramientas.png" alt="logo" className="logo" />
                                    </Col>

                                    <Col>
                                        <p className="title">Administrador</p>
                                    </Col>
                                </Row>
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