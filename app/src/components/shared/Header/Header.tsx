import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";

import './styles.css';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/store";
import { logInAction, logOutAction } from "../../store/user/user.slice";
import LogInModal from "../Modals/Users/LogInModal/LogInModal";
import { ICredential } from "../../../core/interfaces/IUsers";
import Swal from "sweetalert2";

const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [showModalLogIn, setShowModalLogIn] = useState<boolean>(false);

    const clickLogOut = () => {
        Swal.fire({
            icon: 'warning',
            title: '¿Seguro desea cerrar la sesión',
            showCancelButton: true,
            confirmButtonText: `Cerrar`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');

                dispatch(logOutAction({ logged: false, info: null }));

                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Sesión cerrada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    const handleLogIn = (token: string, user: ICredential) => {
        setShowModalLogIn(false);

        localStorage.setItem('token', token);

        dispatch(logInAction({ logged: true, info: user }));

        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Sesión iniciada correctamente',
            showConfirmButton: false,
            timer: 1500
        });
    }

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
                        {
                            (!user.logged) ?
                                <Button
                                    variant="success"
                                    size="lg"
                                    className="button-sesion float-end"
                                    onClick={() => setShowModalLogIn(true)}
                                >Iniciar Sesión</Button> :

                                <div className="container-options">
                                    <Nav.Link href="/settings">
                                        <span
                                            title="Configuraciones del usuario"
                                        >
                                            <i className="fas fa-cog fa-3x icono"></i>
                                        </span>
                                    </Nav.Link>

                                    <Button
                                        variant="danger"
                                        size="lg"
                                        className="ml-4"
                                        onClick={() => clickLogOut()}
                                    >Cerrar Sesión</Button>
                                </div>
                        }
                    </Col>
                </Row>
            </Container>

            {
                showModalLogIn &&
                <LogInModal
                    showModal={showModalLogIn}
                    handleClose={() => setShowModalLogIn(!showModalLogIn)}
                    userLogged={(token: string, user: ICredential) => handleLogIn(token, user)}
                />
            }
        </div>
    );
}

export default Header;