import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { DetailsEntityModalProps } from './types';

import './styles.css';

const DetailsEntityModal = (props: DetailsEntityModalProps) => {
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
                <Container>
                    <Row>
                        <Col>
                            <h4>Nombre</h4>
                            <p>{props.entity.name}</p>
                        </Col>

                        <Col>
                            <h4>Tipo de Entidad</h4>
                            <p>{firstLetterUppercase(props.entity.entityType)}</p>
                        </Col>

                        <Col>
                            <h4>Número Legal</h4>
                            <p>{props.entity.legalNumber}</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h4>Dirección</h4>
                            <p>{props.entity.address}</p>
                        </Col>

                        <Col>
                            <h4>Teléfono</h4>
                            <p>{props.entity.phone}</p>
                        </Col>

                        <Col>
                            <h4>Código Postal</h4>
                            <p>{props.entity.postalCode}</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h4>Email</h4>
                            <p>{props.entity.email}</p>
                        </Col>

                        <Col>
                            <h4>Sector</h4>
                            <p>{props.entity.sector}</p>
                        </Col>

                        <Col>
                            <h4>Coordenadas</h4>
                            <p><b>Longitud:</b> {props.entity.latitude}</p>
                            <p><b>Latitud:</b> {props.entity.longitude}</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h4 className="align-text">Riesgo/s</h4>

                            {
                                props.entity.risk.length == 0 &&
                                <p>No existen riesgos.</p>
                            }

                            {
                                props.entity.risk.length != 0 &&
                                <div className="container-risks">
                                    {
                                        props.entity.risk.map(r => {
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
                                onClick={() => props.handleEditEntity(props.entity)}
                            >Editar</Button>
                        </Col>

                        <Col>
                            <div className="delete-button">
                                <Button
                                    variant="danger"
                                    onClick={() => props.handleDeleteEntity(props.entity._id)}
                                >Eliminar</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
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