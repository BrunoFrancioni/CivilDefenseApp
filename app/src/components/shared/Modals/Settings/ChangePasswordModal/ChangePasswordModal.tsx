import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from 'yup';
import { IChangePassword } from "../../../../../core/interfaces/IUsers";
import { selectUser } from "../../../../store/store";
import { ChangePasswordModalProps } from "./types";

import './styles.css';

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
    const user = useSelector(selectUser);

    const [loading, setLoading] = useState<boolean>(false);

    const initialState: IChangePassword = {
        oldPassword: '',
        newPassword: '',
        secondNewPassword: ''
    }

    const validationSchema = yup.object().shape({
        oldPassword: yup.string().required("Requerido"),
        newPassword: yup.string().required("Requerido"),
        secondNewPassword: yup.string().required("Requerido")
    });

    const handleSubmit = (data: IChangePassword) => {
        setLoading(true);


    }

    return (
        <Modal
            show={props.showModal}
            onHide={() => props.handleClose()}
            size="lg"
            animation={false}
            centered={true}
            onEscapeKeyDown={() => props.handleClose()}
        >
            <Modal.Header closeButton>
                <Modal.Title>Cambiar contraseña</Modal.Title>
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
                        ({
                            values,
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
                                <Form.Group controlId="oldPassword" className="position-relative">
                                    <Form.Label>Contraseña actual</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        placeholder="Ingrese su contraseña actual"
                                        defaultValue={values.oldPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.oldPassword && !errors.oldPassword}
                                        isInvalid={!!errors.oldPassword}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.oldPassword}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group controlId="newPassword" className="position-relative">
                                    <Form.Label>Nueva contraseña</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        placeholder="Ingrese su nueva contraseña"
                                        defaultValue={values.newPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.newPassword && !errors.newPassword}
                                        isInvalid={!!errors.newPassword}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.newPassword}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group controlId="secondNewPassword" className="position-relative">
                                    <Form.Label>Nuevamente su nueva contraseña</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        placeholder="Ingrese de nuevo su nueva contraseña"
                                        defaultValue={values.secondNewPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.secondNewPassword && !errors.secondNewPassword}
                                        isInvalid={!!errors.secondNewPassword}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.secondNewPassword}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <div className="center-container">
                                    <Button
                                        variant="success"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Cambiar contraseña
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
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangePasswordModal;