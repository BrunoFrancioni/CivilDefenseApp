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
                            <h3><b>Nombre</b></h3>
                            <p>{props.entity.name}</p>
                        </Col>

                        <Col>
                            <h3><b>Tipo de Entidad</b></h3>
                            <p>{firstLetterUppercase(props.entity.entityType)}</p>
                        </Col>

                        <Col>
                            <h3><b>Número Legal</b></h3>
                            <p>{props.entity.legalNumber}</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h3><b>Dirección</b></h3>
                            <p>{props.entity.address}</p>
                        </Col>

                        <Col>
                            <h3><b>Teléfono</b></h3>
                            <p>{props.entity.phone}</p>
                        </Col>

                        <Col>
                            <h3><b>Código Postal</b></h3>
                            <p>{props.entity.postalCode}</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h3><b>Email</b></h3>
                            <p>{props.entity.email}</p>
                        </Col>

                        <Col>
                            <h3><b>Sector</b></h3>
                            <p>{props.entity.sector}</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h3 className="align-text"><b>Riesgo/s</b></h3>

                            {
                                props.entity.risk.length === 0 &&
                                <p>No existen riesgos.</p>
                            }

                            {
                                props.entity.risk.length !== 0 &&
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