import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import UsersService from '../../../../../core/services/UsersService';
import { logOutAction } from '../../../../store/user/user.slice';
import { CreateUserModalProps, CreateUserModalState } from './types';

class CreateUserModal extends React.Component<CreateUserModalProps, CreateUserModalState> {
    private dispatch = useDispatch();
    private usersService: UsersService;

    constructor(props: CreateUserModalProps) {
        super(props);

        this.state = {
            createCredentialsDTO: {
                name_lastname: '',
                dni: '',
                organization: '',
                email: ''
            }
        }

        this.usersService = new UsersService();
    }

    handleClose = () => {
        this.props.handleClose(false);
    }

    handleChangesNombreApellido = (value: string) => {
        this.setState({
            createCredentialsDTO: {
                name_lastname: value,
                dni: this.state.createCredentialsDTO.dni,
                organization: this.state.createCredentialsDTO.organization,
                email: this.state.createCredentialsDTO.email
            }
        });
    }

    handleChangesDNI(value: string) {
        this.setState({
            createCredentialsDTO: {
                name_lastname: this.state.createCredentialsDTO.name_lastname,
                dni: value,
                organization: this.state.createCredentialsDTO.organization,
                email: this.state.createCredentialsDTO.email
            }
        });
    }

    handleChangesOrganization(value: string) {
        this.setState({
            createCredentialsDTO: {
                name_lastname: this.state.createCredentialsDTO.name_lastname,
                dni: this.state.createCredentialsDTO.dni,
                organization: value,
                email: this.state.createCredentialsDTO.email
            }
        });
    }

    handleChangesEmail(value: string) {
        this.setState({
            createCredentialsDTO: {
                name_lastname: this.state.createCredentialsDTO.name_lastname,
                dni: this.state.createCredentialsDTO.dni,
                organization: this.state.createCredentialsDTO.organization,
                email: value
            }
        });
    }

    handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const result = await this.usersService.createCredentials(this.state.createCredentialsDTO);
            console.log("Resultado", result);

            this.props.handleUserCreated(result.data.password);
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

                    this.dispatch(logOutAction({ logged: false, info: null }));
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

    render() {
        return (
            <>
                <Modal
                    show={this.props.showModal}
                    onHide={this.handleClose}
                    size="lg"
                    animation={false}
                    centered={true}
                    onEscapeKeyDown={this.handleClose}
                    onSubmit={(e: React.SyntheticEvent) => this.handleSubmit(e)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Usuario</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formNameLastname">
                                <Form.Label>Nombre y Apellido</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Ingrese el nombre y apellido"
                                    required
                                    onChange={e => this.handleChangesNombreApellido(e.target.value)}
                                />
                            </Form.Group>

                            <br />

                            <Form.Group controlId="formDNI">
                                <Form.Label>DNI</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Ingrese el DNI"
                                    required
                                    onChange={e => this.handleChangesDNI(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Ingresar sin puntos
                                </Form.Text>
                            </Form.Group>

                            <br />

                            <Form.Group controlId="formOrganization">
                                <Form.Label>Seleccione su organización</Form.Label>
                                <Form.Control
                                    as="select"
                                    size="lg"
                                    required
                                    onChange={e => this.handleChangesOrganization(e.target.value)}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="defensa civil">Defensa Civil</option>
                                    <option value="bomberos">Bomberos</option>
                                    <option value="policia">Policía</option>
                                </Form.Control>
                            </Form.Group>

                            <br />

                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="email"
                                    placeholder="Ingrese el email"
                                    required
                                    onChange={e => this.handleChangesEmail(e.target.value)}
                                />
                            </Form.Group>

                            <br />

                            <Button variant="primary" type="submit">
                                Crear
                            </Button>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default CreateUserModal;