import React, { useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ILoginCredential } from '../../../core/interfaces/IUsers';
import UsersService from '../../../core/services/UsersService';

import './styles.css';
import { LoginProps } from './types';

const Login = (props: LoginProps) => {
    const usersService: UsersService = new UsersService();

    const initialState: ILoginCredential = {
        email: '',
        password: ''
    }

    const [loginCredential, setLoginCredential] = useState<ILoginCredential>(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChangesEmail = (value: string) => {
        setLoginCredential({
            ...loginCredential,
            email: value
        });
    }

    const handleChangesPassword = (value: string) => {
        setLoginCredential({
            ...loginCredential,
            password: value
        });
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const result = await usersService.loginCredential(loginCredential);

            if (result.status === 200) {
                props.userLogguedIn(result.data.token, result.data.user);
            } else {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Usuario o contraseña incorrecta',
                    icon: 'error'
                });
            }

            setLoading(false);
        } catch (e) {
            console.log("ERROR", e);

            Swal.fire({
                title: 'Ha ocurrido un error',
                text: 'Intente nuevamente',
                icon: 'error'
            });

            setLoading(false);
        }
    }

    return (
        <div className="main-container">
            <div className="card-container">
                <Card className="card-login" style={{ width: '30rem', height: '30rem' }}>
                    <Card.Title>
                        <div className="center-container">
                            <img src="Defensa-Civil-logo.png" alt="logo" className="logo" />
                            <h2>Login</h2>
                        </div>
                    </Card.Title>

                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Ingrese el email"
                                    required
                                    onChange={e => handleChangesEmail(e.target.value)}
                                />
                            </Form.Group>

                            <br />

                            <Form.Group controlId="formPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="password"
                                    placeholder="Ingrese la constraseña"
                                    required
                                    onChange={e => handleChangesPassword(e.target.value)}
                                />
                            </Form.Group>

                            <br />

                            <div className="center-container">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={(e: React.SyntheticEvent) => handleSubmit(e)}
                                >
                                    Iniciar Sesión
                                </Button>
                            </div>
                        </Form>

                        {
                            loading &&
                            <div className="spinner-container">
                                <Spinner animation="border" role="status">
                                </Spinner>
                            </div>
                        }
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Login;