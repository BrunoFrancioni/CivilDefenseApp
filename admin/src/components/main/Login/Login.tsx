import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ILoginCredential } from '../../../core/interfaces/IUsers';
import UsersService from '../../../core/services/UsersService';
import * as yup from 'yup';

import './styles.css';
import { LoginProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/store';
import { Redirect, useHistory } from 'react-router-dom';

const Login = (props: LoginProps) => {
    if (props.userLogged) {
        return <Redirect to="/" />;
    }

    const usersService: UsersService = new UsersService();

    const history = useHistory();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const initialState: ILoginCredential = {
        email: '',
        password: ''
    }

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user.logged) {
            history.push('/');
        }
    }, []);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Requerido").email("Ingrese un email válido"),
        password: yup.string().required("Requerido")
    });

    const handleSubmit = async (values: ILoginCredential) => {
        setLoading(true);

        try {
            const result = await usersService.loginCredential(values);

            props.userLogguedIn(result.data.token, result.data.user);
        } catch (e) {
            if (e.response.status === 400) {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Usuario o contraseña incorrecta',
                    icon: 'error'
                });
            } else if (e.response.status === 401) {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Usuario no tiene acceso a este sistema',
                    icon: 'error'
                });
            } else {
                console.log("ERROR", e);

                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Intente nuevamente',
                    icon: 'error'
                });
            }

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
                        <Formik
                            initialValues={initialState}
                            validationSchema={validationSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);

                                handleSubmit(data);

                                setSubmitting(false);
                            }}
                        >
                            {
                                ({ values,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    touched
                                }) => (
                                    <Form
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Group
                                            controlId="email"
                                            className="position-relative"
                                        >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="email"
                                                placeholder="Ingrese el email"
                                                defaultValue={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.email && !errors.email}
                                                isInvalid={!!errors.email}
                                            />

                                            <Form.Control.Feedback
                                                type="invalid"
                                                tooltip
                                            >{errors.email}</Form.Control.Feedback>
                                        </Form.Group>

                                        <br />

                                        <Form.Group
                                            controlId="password"
                                            className="position-relative"
                                        >
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="password"
                                                placeholder="Ingrese la contraseña"
                                                defaultValue={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.password && !errors.password}
                                                isInvalid={!!errors.password}
                                            />

                                            <Form.Control.Feedback
                                                type="invalid"
                                                tooltip
                                            >{errors.password}</Form.Control.Feedback>
                                        </Form.Group>

                                        <br />

                                        <div className="center-container">
                                            <Button
                                                variant="success"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Iniciar Sesión
                                            </Button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>

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