import React, { useState } from "react";
import { LogInModalProps } from "./types";
import { ICredentialLogIn } from '../../../../../core/interfaces/IUsers';
import UsersService from "../../../../../core/services/UsersService";
import { Button, Modal, Spinner, Form } from "react-bootstrap";

import './styles.css';
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as yup from 'yup';

const LogInModal = (props: LogInModalProps) => {
    const usersService: UsersService = new UsersService();

    const initialState: ICredentialLogIn = {
        email: '',
        password: ''
    }

    const [loading, setLoading] = useState<boolean>(false);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Requerido").email("Ingrese un email válido"),
        password: yup.string().required("Requerido")
    });

    const handleSubmit = async (values: ICredentialLogIn) => {
        setLoading(true);

        try {
            const result = await usersService.loginCredential(values);

            if (result.status === 200) {
                props.userLogged(result.data.token, result.data.user);
            }
        } catch (e) {
            if (e.response.status === 400) {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Usuario o contraseña incorrecta',
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
        <Modal
            show={props.showModal}
            onHide={() => props.handleClose(false)}
            size="sm"
            animation={false}
            centered={true}
            onEscapeKeyDown={() => props.handleClose(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Iniciar sesión</Modal.Title>
            </Modal.Header>

            <Modal.Body>
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
                                <Form.Group controlId="email" className="position-relative">
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

                                <Form.Group controlId="password" className="position-relative">
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
                        )}
                </Formik>

                {
                    loading &&
                    <div className="spinner-container">
                        <Spinner animation="border" role="status">
                        </Spinner>
                    </div>
                }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogInModal;