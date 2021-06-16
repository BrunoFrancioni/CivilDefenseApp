import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";

import './styles.css';

const Header = () => {
    return (
        <div className="header-container">
            <Container>
                <Row>
                    <Col>
                        <Nav>
                            <Nav.Link href="/">
                                <img src="Defensa-Civil-logo.png" alt="logo" className="logo" />
                            </Nav.Link>
                        </Nav>
                    </Col>

                    <Col>
                        <Button
                            variant="success"
                            size="lg"
                            className="button-sesion float-end"

                        >Iniciar Sesión</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;