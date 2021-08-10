import React from 'react';
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap';

import Swal from 'sweetalert2';

import UsersService from '../../../core/services/UsersService';
import Paginator from '../../shared/Paginator/Paginator';
import { UsersState } from './types';

import './styles.css';
import CreateUserModal from '../../shared/Modals/Users/CreateUserModal/CreateUserModal';
import EditUserModal from '../../shared/Modals/Users/EditUserModal/EditUserModal';
import { ICredential, IGetNewPassword } from '../../../core/interfaces/IUsers';
import Header from '../../shared/Header/Header';
import Sidebar from '../../shared/Sidebar/Sidebar';
import { connect, ConnectedProps } from 'react-redux';
import { logOutAction } from '../../store/user/user.slice';
import { Dispatch } from '@reduxjs/toolkit';

class Users extends React.Component<UsersProps, UsersState> {
    private usersService: UsersService;

    private initialStateCredential: ICredential = {
        _id: '',
        name_lastname: '',
        dni: '',
        organization: '',
        email: ''
    }

    constructor(props: UsersProps) {
        super(props);

        this.state = {
            loading: true,
            actualPage: 1,
            sizePage: 5,
            users: [],
            credential: this.initialStateCredential,
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

            this.setState({
                totalResults: result.data.totalResults,
                users: (result.data.credentials) ? result.data.credentials : [],
                searchWithError: false
            });

            this.setState({ loading: false });
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

                    this.props.logOut();
                });
            } else {
                this.setState({
                    loading: false,
                    totalResults: 0,
                    users: [],
                    searchWithError: true
                });
            }
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

    handleEditarClick = (state: boolean, user: ICredential) => {
        this.setState({
            credential: user,
            showEditUserModal: state
        });
    }

    handleUserEdited = () => {
        this.setState({
            credential: this.initialStateCredential,
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
                } catch (e) {
                    console.log('ERROR', e);

                    if (e.response.status === 401) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'La sesión ha expirado',
                            text: 'Por favor, iníciela de nuevo.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            localStorage.removeItem('token');

                            this.props.logOut();
                        });
                    } else {
                        Swal.fire({
                            title: 'Ha ocurrido un error',
                            icon: 'error'
                        });
                    }
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
                } catch (e) {
                    console.log('ERROR', e);

                    if (e.response.status === 401) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'La sesión ha expirado',
                            text: 'Por favor, iníciela de nuevo.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            localStorage.removeItem('token');

                            this.props.logOut();
                        });
                    } else {
                        Swal.fire({
                            title: 'Ha ocurrido un error',
                            icon: 'error'
                        });
                    }
                }
            }
        })
    }

    render() {
        return (
            <>
                <Header />

                <Container>
                    <Row>
                        <Col md={2}>
                            <Sidebar />
                        </Col>

                        <Col>
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
                                                                            onClick={() => this.handleEditarClick(true, user)}
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
                                    credential={this.state.credential}
                                    handleClose={this.handleEditarClick.bind(this)}
                                    handleUserUpdated={this.handleUserEdited}
                                />
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        logOut: () => dispatch(logOutAction({ logged: false, info: null }))
    }
};

const connector = connect(null, mapDispatchToProps);

type UsersProps = ConnectedProps<typeof connector>;

export default connector(Users);