import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { IEntity } from '../../../../../core/interfaces/IEntities';
import EntitiesService from '../../../../../core/services/EntitiesService';
import { DetailsEntityModalProps } from './types';

import './styles.css';

const DetailsEntityModal = (props: DetailsEntityModalProps) => {
    const entitiesService: EntitiesService = new EntitiesService();

    const [loading, setLoading] = useState<boolean>(true);
    const [entity, setEntity] = useState<IEntity | null>(null);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getEntity();
        })();
    }, []);

    const getEntity = async () => {
        try {
            const result = await entitiesService.getEntity(props.id);

            if (result.status === 200) {
                setEntity(result.data.entity);
                setLoading(false);
                setSearchWithError(false);
            } else {
                setEntity(null);
                setLoading(false);
                setSearchWithError(true);
            }
        } catch (e) {
            console.log('Error', e);

            setEntity(null);
            setLoading(false);
            setSearchWithError(true);
        }
    }

    const firstLetterUppercase = (cadena: string) => {
        return cadena.replace(cadena.charAt(0), cadena.charAt(0).toUpperCase());
    }

    return (
        <Modal
            show={props.showModal}
            onHide={props.handleClose}
            size="lg"
            animation={false}
            centered={true}
            onEscapeKeyDown={props.handleClose}

        >
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Entidad</Modal.Title>
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
                    loading && searchWithError &&
                    <Container fluid>
                        <p><i className="fas fa-exclamation-triangle"></i> Ha ocurrido un error. Intente nuevamente.</p>
                    </Container>
                }

                {
                    !loading && !searchWithError &&
                    entity != null &&
                    <Container>
                        <Row>
                            <Col>
                                <h4>Nombre</h4>
                                <p>{entity.name}</p>
                            </Col>

                            <Col>
                                <h4>Tipo de Entidad</h4>
                                <p>{firstLetterUppercase(entity.entityType)}</p>
                            </Col>

                            <Col>
                                <h4>Número Legal</h4>
                                <p>{entity.legalNumber}</p>
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <h4>Dirección</h4>
                                <p>{entity.address}</p>
                            </Col>

                            <Col>
                                <h4>Teléfono</h4>
                                <p>{entity.phone}</p>
                            </Col>

                            <Col>
                                <h4>Código Postal</h4>
                                <p>{entity.postalCode}</p>
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <h4>Email</h4>
                                <p>{entity.email}</p>
                            </Col>

                            <Col>
                                <h4>Sector</h4>
                                <p>{entity.sector}</p>
                            </Col>

                            <Col>
                                <h4>Coordenadas</h4>
                                <p><b>Longitud:</b> {entity.coordinates[0]}</p>
                                <p><b>Latitud:</b> {entity.coordinates[1]}</p>
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <h4 className="align-text">Riesgo/s</h4>

                                {
                                    entity.risk.length == 0 &&
                                    <p>No existen riesgos.</p>
                                }

                                {
                                    entity.risk.length != 0 &&
                                    <div className="container-risks">
                                        {
                                            entity.risk.map(r => {
                                                return (
                                                    <p
                                                        key={r}
                                                    >{firstLetterUppercase(r)}&nbsp;</p>
                                                );
                                            })
                                        }
                                    </div>
                                }
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <Button
                                    variant="warning"
                                    onClick={() => props.handleEditEntity(props.id)}
                                >Editar</Button>
                            </Col>

                            <Col>
                                <div className="delete-button">
                                    <Button
                                        variant="danger"
                                        onClick={() => props.handleDeleteEntity(props.id)}
                                    >Eliminar</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
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

export default DetailsEntityModal;