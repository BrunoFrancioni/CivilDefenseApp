import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import EntitiesService from '../../../core/services/EntitiesService';
import { EntitiesProps, EntitiesState } from './types';

import './styles.css';
import Paginator from '../../shared/Paginator/Paginator';
import { IEntity } from '../../../core/interfaces/IEntities';
import CreateEntityModal from '../../shared/Modals/Entities/CreateEntityModal/CreateEntityModal';
import Swal from 'sweetalert2';

const Entities = (props: EntitiesProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [actualPage, setActualPage] = useState<number>(1);
    const [sizePage, setSizePage] = useState<number>(10);
    const [entities, setEntities] = useState<IEntity[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    const entitiesService: EntitiesService = new EntitiesService();

    useEffect(() => {
        (async () => {
            await getEntities();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getEntities();
        })();
    }, [actualPage]);

    const getEntities = async () => {
        try {
            const result = await entitiesService.getEntities(actualPage, sizePage);

            if (result.status === 200) {
                setTotalResults(result.data.totalResults);
                setEntities(result.data.entities);
                setSearchWithError(false);
            } else {
                setTotalResults(0);
                setEntities([]);
                setSearchWithError(true);
            }

            setLoading(false);
        } catch (e) {
            console.log('Error gettin entities', e);

            setTotalResults(0);
            setEntities([]);
            setSearchWithError(true);
            setLoading(false);
        }
    }

    const changePage = (number: number) => {
        if (actualPage != number) {
            setTotalResults(0);
            setEntities([]);
            setSearchWithError(false);
            setLoading(true);
            setActualPage(number);
        }
    }

    const firstLetterUppercase = (cadena: string) => {
        return cadena.replace(cadena.charAt(0), cadena.charAt(0).toUpperCase());
    }

    const handleUserCreated = () => {
        setShowCreateModal(false);

        Swal.fire({
            title: 'Entidad creada correctamente',
            icon: 'success'
        }).then(() => {
            setLoading(true);
            setTotalResults(0);
            setEntities([]);
            setSearchWithError(false);
            setActualPage(1);
        });
    }

    const handleDeleteClick = (id: string) => {
        Swal.fire({
            title: '¿Está seguro que desea eliminar la entidad?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await entitiesService.deleteEntity(id);

                    if (result.status === 201) {
                        Swal.fire({
                            title: 'Entidad eliminada correctamente',
                            icon: 'success'
                        }).then(() => {
                            setLoading(true);
                            setTotalResults(0);
                            setEntities([]);
                            setSearchWithError(false);
                            setActualPage(1);
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

    return (
        <>
            <h1>Entidades</h1>
            <hr />

            <Container fluid>
                <Row>
                    <Col md={11}></Col>

                    <Col>
                        <Button
                            variant="success"
                            size="lg"
                            className="button-crear"
                            onClick={() => setShowCreateModal(true)}
                        >Crear</Button>
                    </Col>
                </Row>
            </Container>

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
                        <i className="fas fa-exclamation-triangle">
                        </i> Ha ocurrido un error. Intente nuevamente.
                    </p>
                </Container>
            }

            {
                !loading && totalResults == 0 &&
                entities == [] && !searchWithError &&
                <Container fluid>
                    <p>No se han encontrado resultados</p>
                </Container>
            }

            {
                !loading && totalResults != 0 &&
                entities != [] && !searchWithError &&
                <Container fluid>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre Institución</th>
                                <th>Numero Legal</th>
                                <th>Tipo</th>
                                <th>Sector</th>
                                <th>Teléfono</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                entities.map((entity) => {
                                    return (
                                        <tr key={entity._id}>
                                            <td>{entity.name}</td>
                                            <td>{entity.legalNumber}</td>
                                            <td>{firstLetterUppercase(entity.entityType)}</td>
                                            <td>{entity.sector}</td>
                                            <td>{entity.phone}</td>
                                            <td>
                                                <div className="container-options">
                                                    <span title="Ver detalles de la entidad">
                                                        <i
                                                            className="fas fa-info-circle option"

                                                        ></i>
                                                    </span>
                                                    <span title="Editar entidad">
                                                        <i
                                                            className="fas fa-edit option"

                                                        ></i>
                                                    </span>
                                                    <span title="Eliminar entidad">
                                                        <i
                                                            className="fas fa-minus-square option"
                                                            onClick={() => handleDeleteClick(entity._id)}
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
                        active={actualPage}
                        totalResults={totalResults}
                        sizePage={sizePage}
                        changePage={changePage.bind(this)}
                    />
                </Container>
            }

            {
                showCreateModal &&
                <CreateEntityModal
                    showModal={showCreateModal}
                    handleClose={() => setShowCreateModal(false)}
                    handleUserCreated={handleUserCreated}
                />
            }
        </>
    )
}

export default Entities;