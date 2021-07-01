import React from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { logOutAction } from '../../store/user/user.slice';

import './styles.css';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        Swal.fire({
            icon: 'warning',
            title: '¿Seguro desea cerrar la sesión',
            showCancelButton: true,
            confirmButtonText: `Cerrar`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');

                dispatch(logOutAction({ logged: false, info: null }));
            }
        });
    }

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
                        <Button
                            variant="danger"
                            size="lg"
                            className="button-salir float-end"
                            onClick={handleLogOut}
                        >Salir</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header;