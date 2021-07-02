import React from 'react';
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { ICredential, IEditCredential } from '../../../../../core/interfaces/IUsers';
import UsersService from '../../../../../core/services/UsersService';
import { logOutAction } from '../../../../store/user/user.slice';
import { EditUserModalProps, EditUserModalStatus } from './types';

class EditUserModal extends React.Component<EditUserModalProps, EditUserModalStatus> {
    private usersService: UsersService;
    private dispatch = useDispatch();

    constructor(props: EditUserModalProps) {
        super(props);

        this.state = {
            loading: true,
            searchWithError: false,
            credential: {
                _id: '',
                name_lastname: '',
                dni: '',
                organization: '',
                email: '',
            },
            editCredentialDTO: {
                name_lastname: '',
                dni: '',
                organization: ''
            }
        }

        this.usersService = new UsersService();
    }

    componentDidMount() {
        this.getCredential();
    }

    async getCredential() {
        try {
            const result = await this.usersService.getCredentialById(this.props.idCredential);
            console.log(result);

            this.setState({
                loading: false,
                searchWithError: false,
                credential: result.data.credential,
                editCredentialDTO: {
                    name_lastname: result.data.credential.name_lastname,
                    dni: result.data.credential.dni,
                    organization: result.data.credential.organization
                }
            });
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

                    this.dispatch(logOutAction({ logged: false, info: null }));
                });
            } else {
                let credential: ICredential = {
                    _id: '',
                    name_lastname: '',
                    dni: '',
                    organization: '',
                    email: '',
                }

                let editCredentialDTO: IEditCredential = {
                    name_lastname: '',
                    dni: '',
                    organization: ''
                }

                this.setState({
                    loading: false,
                    searchWithError: true,
                    credential: credential,
                    editCredentialDTO: editCredentialDTO
                });
            }
        }
    }

    firstLetterLowercase = (cadena: string) => {
        return cadena.replace(cadena.charAt(0), cadena.charAt(0).toLowerCase());
    }

    handleClose = () => {
        let credential: IEditCredential = {
            name_lastname: '',
            dni: '',
            organization: ''
        }

        this.props.handleClose(false, credential);
    }

    handleChangesNombreApellido = (value: string) => {
        this.setState({
            editCredentialDTO: {
                name_lastname: value,
                dni: this.state.editCredentialDTO.dni,
                organization: this.state.editCredentialDTO.organization
            }
        });
    }

    handleChangesDNI(value: string) {
        this.setState({
            editCredentialDTO: {
                name_lastname: this.state.editCredentialDTO.name_lastname,
                dni: value,
                organization: this.state.editCredentialDTO.organization
            }
        });
    }

    handleChangesOrganization(value: string) {
        this.setState({
            editCredentialDTO: {
                name_lastname: this.state.editCredentialDTO.name_lastname,
                dni: this.state.editCredentialDTO.dni,
                organization: value
            }
        });
    }

    handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const result = await this.usersService
                .editCredentials(this.props.idCredential, this.state.editCredentialDTO);

            this.props.handleUserUpdated();
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
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {
                        this.state.loading &&
                        <div className="spinner-container">
                            <Spinner animation="border" role="status">
                            </Spinner>
                        </div>
                    }

                    {
                        !this.state.loading && this.state.searchWithError &&
                        <Container fluid>
                            <p><i className="fas fa-exclamation-triangle"></i> Ha ocurrido un error. Intente nuevamente.</p>
                        </Container>
                    }

                    {
                        !this.state.loading && !this.state.searchWithError &&
                        <Form>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="email"
                                    value={this.state.credential.email}
                                    readOnly
                                />
                            </Form.Group>

                            <br />

                            <Form.Group controlId="formNameLastname">
                                <Form.Label>Nombre y Apellido</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Ingrese el nombre y apellido"
                                    required
                                    defaultValue={this.state.editCredentialDTO.name_lastname}
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
                                    defaultValue={this.state.editCredentialDTO.dni}
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
                                    defaultValue={this.firstLetterLowercase(this.state.editCredentialDTO.organization)}
                                    onChange={e => this.handleChangesOrganization(e.target.value)}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="defensa civil">Defensa Civil</option>
                                    <option value="bomberos">Bomberos</option>
                                    <option value="policia">Policía</option>
                                </Form.Control>
                            </Form.Group>

                            <br />

                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </Form>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditUserModal;