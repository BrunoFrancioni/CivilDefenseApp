import React, { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import Swal from 'sweetalert2';
import { ICreateCredentials } from '../../../../../core/interfaces/IUsers';

import UsersService from '../../../../../core/services/UsersService';
import { logOutAction } from '../../../../store/user/user.slice';
import { CreateUserModalProps } from './types';
import { useDispatch } from 'react-redux';

import './styles.css';

const CreateUserModal = (props: CreateUserModalProps) => {
    const usersService: UsersService = new UsersService();

    const initialState: ICreateCredentials = {
        name_lastname: '',
        dni: '',
        organization: '',
        email: ''
    }

    const typeOrganization = [
        "Defensa Civil",
        "Bomberos",
        "Policía"
    ]

    const validationSchema = yup.object().shape({
        name_lastname: yup.string().required("Requerido"),
        dni: yup.string().required("Requerido"),
        organization: yup.string().required('Required'),
        email: yup.string().required("Requerido").email("Ingrese un email válido")
    });

    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleSubmit = async (values: ICreateCredentials) => {
        setLoading(true);

        try {
            const result = await usersService.createCredentials(values);
            console.log("Resultado", result);

            setLoading(false);

            props.handleUserCreated(result.data.password);
        } catch (e) {
            console.log("ERROR", e);

            setLoading(false);

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
            } else if (e.response.status === 400) {
                Swal.fire({
                    title: 'Oops...',
                    text: 'El usuario ya existe. Pruebe con otro email.',
                    icon: 'warning'
                });
            } else {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Intente nuevamente',
                    icon: 'error'
                });
            }
        }
    }

    return (
        <Modal
            show={props.showModal}
            onHide={() => props.handleClose(false)}
            size="lg"
            animation={false}
            centered={true}
            onEscapeKeyDown={() => props.handleClose(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Crear Usuario</Modal.Title>
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
                                <Form.Group
                                    controlId="name_lastname"
                                    className="position-relative"
                                >
                                    <Form.Label>Nombre y Apellido</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese el nombre y apellido"
                                        defaultValue={values.name_lastname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.name_lastname && !errors.name_lastname}
                                        isInvalid={!!errors.name_lastname}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.name_lastname}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="dni"
                                    className="position-relative"
                                >
                                    <Form.Label>DNI</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese el DNI"
                                        defaultValue={values.dni}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.dni && !errors.dni}
                                        isInvalid={!!errors.dni}
                                    />
                                    <Form.Text className="text-muted">
                                        Ingresar sin puntos
                                    </Form.Text>

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.dni}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="organization"
                                    className="position-relative"
                                >
                                    <Form.Label>Seleccione su organización</Form.Label>
                                    <Form.Control
                                        as="select"
                                        size="lg"
                                        defaultValue={values.organization}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.organization && !errors.organization}
                                        isInvalid={!!errors.organization}
                                    >
                                        <option value={""}>Selecciona una opción</option>
                                        {
                                            typeOrganization.map((organization, index) => {
                                                return <option value={organization} key={index}>
                                                    {organization}
                                                </option>
                                            })
                                        }
                                    </Form.Control>

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.organization}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

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

                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Crear
                                </Button>
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
                <Button variant="secondary" onClick={() => props.handleClose(false)}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateUserModal;