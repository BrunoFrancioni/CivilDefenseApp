import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { ICredential, IEditCredential } from '../../../../../core/interfaces/IUsers';
import UsersService from '../../../../../core/services/UsersService';
import { logOutAction } from '../../../../store/user/user.slice';
import { EditUserModalProps } from './types';
import { Formik } from 'formik';

const EditUserModal = (props: EditUserModalProps) => {
    const usersService: UsersService = new UsersService();
    const dispatch = useDispatch();

    const initialStateCredential: ICredential = {
        _id: '',
        name_lastname: '',
        dni: '',
        organization: '',
        email: ''
    }

    const initialStateEditCredential: IEditCredential = {
        name_lastname: '',
        dni: '',
        organization: ''
    }

    const [loading, setLoading] = useState<boolean>(false);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);
    const [credential, setCredential] = useState<ICredential>(initialStateCredential);
    const [editCredentialDTO, setEditCredentialDTO] = useState<IEditCredential>(initialStateEditCredential);

    useEffect(() => {
        /*(async () => {
            await getCredential();
        })();*/
    }, [])
    /*
    const getCredential = async () => {
        try {
            const result = await usersService.getCredentialById(props.idCredential);
            console.log(result);

            setCredential(result.data.credential);
            setEditCredentialDTO({
                name_lastname: result.data.credential.name_lastname,
                dni: result.data.credential.dni,
                organization: result.data.credential.organization
            });

            setLoading(false);
            setSearchWithError(false);
        } catch (e) {
            console.log(e);

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
            } else {
                setLoading(false);
                setSearchWithError(true);
                setCredential(initialStateCredential);
                setEditCredentialDTO(initialStateEditCredential);
            }
        }
    }
    */
    const typeOrganization = [
        "Defensa Civil",
        "Bomberos",
        "Policía"
    ]

    const getEditCredentialDTO = (): IEditCredential => {
        return editCredentialDTO;
    }

    const validationSchema = yup.object().shape({
        name_lastname: yup.string().required("Requerido"),
        dni: yup.string().required("Requerido"),
        organization: yup.string().required('Required'),
        email: yup.string().required("Requerido").email("Ingrese un email válido")
    });

    const firstLetterLowercase = (cadena: string) => {
        return cadena.replace(cadena.charAt(0), cadena.charAt(0).toLowerCase());
    }

    const handleClose = () => {
        let credential: ICredential = {
            _id: '',
            name_lastname: '',
            dni: '',
            organization: '',
            email: ''
        }

        props.handleClose(false, credential);
    }

    const handleSubmit = async (values: ICredential) => {
        try {
            const credentialEdited: IEditCredential = {
                name_lastname: values.name_lastname,
                dni: values.dni,
                organization: values.organization
            }

            const result = await usersService
                .editCredentials(props.credential._id, credentialEdited);

            props.handleUserUpdated();
        } catch (e) {
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
            onHide={handleClose}
            size="lg"
            animation={false}
            centered={true}
            onEscapeKeyDown={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    loading &&
                    <div className="spinner-container">
                        <Spinner animation="border" role="status">
                        </Spinner>
                    </div>
                }

                {
                    !loading && searchWithError &&
                    <Container fluid>
                        <p>
                            <i className="fas fa-exclamation-triangle"></i> Ha ocurrido un error. Intente nuevamente.
                        </p>
                    </Container>
                }

                {
                    !loading && !searchWithError &&
                    <Formik
                        initialValues={props.credential}
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
                                        controlId="email"
                                        className="position-relative"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="email"
                                            placeholder="Ingrese el email"
                                            defaultValue={values.email}
                                            readOnly
                                        />
                                    </Form.Group>

                                    <br />

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

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Guardar
                                    </Button>
                                </Form>
                            )
                        }
                    </Formik>
                }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditUserModal;