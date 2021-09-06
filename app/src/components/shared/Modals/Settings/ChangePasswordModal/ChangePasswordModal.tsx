import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from 'yup';
import { IChangePassword } from "../../../../../core/interfaces/IUsers";
import { selectUser } from "../../../../store/store";
import { ChangePasswordModalProps } from "./types";

import './styles.css';
import UsersService from "../../../../../core/services/UsersService";
import Swal from "sweetalert2";
import { logOutAction } from "../../../../store/user/user.slice";

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const usersService: UsersService = new UsersService();

    const [loading, setLoading] = useState<boolean>(false);

    const initialState: IChangePassword = {
        oldPassword: '',
        newPassword: '',
        secondNewPassword: ''
    }

    const validationSchema = yup.object().shape({
        oldPassword: yup.string().required("Requerido"),
        newPassword: yup.string().required("Requerido"),
        secondNewPassword: yup.string().required("Requerido").when("newPassword", {
            is: (val: string) => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
                [yup.ref("newPassword")],
                "Las contraseñas deben coincidir"
            )
        })
    });

    const handleSubmit = async (data: IChangePassword) => {
        setLoading(true);

        try {
            if(user.info) {
                const result = await usersService.changePassword(user.info._id, data);

                console.log(result);

                props.handlePasswordChanged();
            }
        } catch(e: any) {
            console.log("ERROR", e);
            
            if (e.response.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    title: 'La sesión ha expirado',
                    text: 'Por favor, iníciela de nuevo.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    localStorage.removeItem('token');

                    dispatch(logOutAction({ logged: false, info: null }));
                });
            } else if(e.response.status === 400) {
                if(e.response.data.message === 'New password and old password are required.') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                        text: 'La nueva contraseña y la actual son requeridas',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setLoading(false);
                } else if(e.response.data.message === 'User not found') {
                    Swal.fire({
                        title: 'Ha ocurrido un error',
                        text: 'Intente nuevamente',
                        icon: 'error'
                    });

                    setLoading(false);
                } else if(e.response.data.message === 'Bad old password') {
                    Swal.fire({
                        title: 'Ha ocurrido un error',
                        text: 'Ha colocado mal su contraseña actual',
                        icon: 'error'
                    });

                    setLoading(false);
                }
            } else {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Intente nuevamente',
                    icon: 'error'
                });

                setLoading(false);
            }
        }
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