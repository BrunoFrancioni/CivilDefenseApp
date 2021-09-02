import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { DetailsIconsEntityModalProps } from './types';

import './styles.css';

const DetailsIconsEntityModal = (props: DetailsIconsEntityModalProps) => {
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
                <Modal.Title>Detalles de las Entidades</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <div className="container-col">
                                <img
                                    alt="School"
                                    src="./images/marker-school.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Educación</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Hospital"
                                    src="./images/marker-hospital.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Centro salud</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Gas Station"
                                    src="./images/marker-gas-station.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Depósito combustible</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Municipality"
                                    src="./images/marker-municipality.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Organismo público</p>
                            </div>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Events"
                                    src="./images/marker-events.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Lugar evento masivo</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Club"
                                    src="./images/marker-sport.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Club</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Bed"
                                    src="./images/marker-bed.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Hogar acogida</p>
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

export default DetailsIconsEntityModal;