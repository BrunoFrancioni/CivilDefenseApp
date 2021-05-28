import React from 'react';
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap';

import Swal from 'sweetalert2';

import UsersService from '../../../core/services/UsersService';
import Paginator from '../../shared/Paginator/Paginator';
import { UsersProps, UsersState } from './types';

import './styles.css';
import CreateUserModal from '../../shared/Modals/Users/CreateUserModal/CreateUserModal';
import EditUserModal from '../../shared/Modals/Users/EditUserModal/EditUserModal';
import { IGetNewPassword } from '../../../core/interfaces/IUsers';

class Users extends React.Component<UsersProps, UsersState> {
    private usersService: UsersService;

    constructor(props: UsersProps) {
        super(props);

        this.state = {
            loading: true,
            actualPage: 1,
            sizePage: 5,
            users: [],
            idCredential: '',
            totalResults: 0,
            searchWithError: false,
            showCreateUserModal: false,
            showEditUserModal: false
        }

        this.usersService = new UsersService();
    }

    componentDidMount() {
        this.getCredentials();
    }

    async getCredentials() {
        try {
            const result = await this.usersService.getCredentials(this.state.actualPage, this.state.sizePage);

            if (result.status === 200) {
                this.setState({
                    totalResults: result.data.totalResults,
                    users: result.data.credentials,
                    searchWithError: false
                });
            } else {
                this.setState({
                    totalResults: 0,
                    users: [],
                    searchWithError: true
                });
            }

            this.setState({ loading: false });
        } catch (e) {
            console.log(e);

            this.setState({
                loading: false,
                totalResults: 0,
                users: [],
                searchWithError: true
            });
        }
    }

    firstLetterUppercase(cadena: string) {
        return cadena.replace(cadena.charAt(0), cadena.charAt(0).toUpperCase());
    }

    changePage = (number: number) => {
        if (this.state.actualPage != number) {
            this.setState({
                totalResults: 0,
                users: [],
                searchWithError: false,
                loading: true,
                actualPage: number
            },
                this.getCredentials);
        }
    }

    handleCrearClick = (state: boolean) => {
        this.setState({
            showCreateUserModal: state
        });
    }

    handleUserCreated = (password: string) => {
        this.setState({
            showCreateUserModal: false
        });

        Swal.fire({
            title: 'Usuario creado correctamente',
            text: `Contraseña: ${password}`,
            icon: 'success'
        }).then(() => {
            this.setState({
                loading: true,
                totalResults: 0,
                users: [],
                searchWithError: false,
                actualPage: 1
            },
                this.getCredentials);
        });
    }

    handleEditarClick = (state: boolean, id: string) => {
        this.setState({
            idCredential: id,
            showEditUserModal: state
        });
    }

    handleUserEdited = () => {
        this.setState({
            idCredential: '',
            showEditUserModal: false
        });

        Swal.fire({
            title: 'Usuario editado correctamente',
            icon: 'success'
        }).then(() => {
            this.setState({
                loading: true,
                totalResults: 0,
                users: [],
                searchWithError: false,
                actualPage: 1
            },
                this.getCredentials);
        });
    }

    handleDeleteClick = (id: string) => {
        Swal.fire({
            title: '¿Está seguro que desea eliminar el usuario?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await this.usersService.deleteCredential(id);

                    if (result.status === 201) {
                        Swal.fire({
                            title: 'Usuario eliminado correctamente',
                            icon: 'success'
                        }).then(() => {
                            this.setState({
                                loading: true,
                                totalResults: 0,
                                users: [],
                                searchWithError: false,
                                actualPage: 1
                            },
                                this.getCredentials);
                        });
                    } else {
                        Swal.fire({
                            title: 'Ha ocurrido un error',
                            icon: 'error'
                        });
                    }
                } catch (e) {
                    console.log('ERROR', e);

                    Swal.fire({
                        title: 'Ha ocurrido un error',
                        icon: 'error'
                    });
                }
            }
        });
    }

    handlePasswordClick = (id: string) => {
        Swal.fire({
            title: '¿Está seguro que desea generar una nueva contraseña para el usuario?',
            showCancelButton: true,
            confirmButtonText: 'Generar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let consult: IGetNewPassword = {
                        idAdmin: '6032bc2b5641fc3e3077bd56',
                        idCredential: id
                    };

                    const result = await this.usersService.generateNewPassword(consult);
                    console.log(result);
                    if (result.status === 200) {
                        Swal.fire({
                            title: 'Se genero una nueva contraseña para el usuario',
                            text: `La contraseña generada es: ${result.data.password}`,
                            icon: 'success'
                        }).then(() => {
                            this.setState({
                                loading: true,
                                totalResults: 0,
                                users: [],
                                searchWithError: false,
                                actualPage: 1
                            },
                                this.getCredentials);
                        });
                    } else {
                        Swal.fire({
                            title: 'Ha ocurrido un error',
                            icon: 'error'
                        });
                    }
                } catch (e) {
                    console.log('ERROR', e);

                    Swal.fire({
                        title: 'Ha ocurrido un error',
                        icon: 'error'
                    });
                }
            }
        })
    }

    render() {
        return (
            <>
                <h1>Usuarios</h1>
                <hr />

                <Container fluid>
                    <Row>
                        <Col md={11}></Col>

                        <Col>
                            <Button
                                variant="success"
                                size="lg"
                                className="button-crear"
                                onClick={() => this.handleCrearClick(true)}
                            >Crear</Button>
                        </Col>
                    </Row>
                </Container>

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
                    !this.state.loading && this.state.totalResults == 0 &&
                    !this.state.searchWithError &&
                    <Container fluid>
                        <p>No se han encontrado resultados</p>
                    </Container>
                }

                {
                    !this.state.loading && this.state.totalResults != 0 &&
                    !this.state.searchWithError &&
                    <Container fluid>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre Apellido</th>
                                    <th>DNI</th>
                                    <th>Organizacion</th>
                                    <th>Email</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map((user, index) => {
                                        return (
                                            <tr key={user._id}>
                                                <td>{user.name_lastname}</td>
                                                <td>{user.dni}</td>
                                                <td>{this.firstLetterUppercase(user.organization)}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <div className="container-options">
                                                        <span title="Editar usuario">
                                                            <i
                                                                className="fas fa-user-edit option"
                                                                onClick={() => this.handleEditarClick(true, user._id)}
                                                            ></i>
                                                        </span>
                                                        <span title="Eliminar usuario">
                                                            <i
                                                                className="fas fa-user-minus option"
                                                                onClick={() => this.handleDeleteClick(user._id)}
                                                            ></i>
                                                        </span>
                                                        <span title="Soliciar nueva contraseña">
                                                            <i
                                                                className="fas fa-key option"
                                                                onClick={() => this.handlePasswordClick(user._id)}
                                                            ></i>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>

                        <Paginator
                            active={this.state.actualPage}
                            totalResults={this.state.totalResults}
                            sizePage={this.state.sizePage}
                            changePage={this.changePage.bind(this)}
                        />
                    </Container>
                }

                {
                    this.state.showCreateUserModal &&
                    <CreateUserModal
                        showModal={this.state.showCreateUserModal}
                        handleClose={this.handleCrearClick.bind(this)}
                        handleUserCreated={this.handleUserCreated.bind(this)}
                    />
                }

                {
                    this.state.showEditUserModal &&
                    <EditUserModal
                        showModal={this.state.showEditUserModal}
                        idCredential={this.state.idCredential}
                        handleClose={this.handleEditarClick.bind(this)}
                        handleUserUpdated={this.handleUserEdited}
                    />
                }
            </>
        )
    }
}

export default Users;