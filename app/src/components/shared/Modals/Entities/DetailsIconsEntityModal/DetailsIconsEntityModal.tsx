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
                                    src="./ionicons.designerpack/school.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Educación</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Hospital"
                                    src="./ionicons.designerpack/fitness-outline.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Centro salud</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Gas Station"
                                    src="./ionicons.designerpack/car-outline.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Depósito combustible</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Municipality"
                                    src="./ionicons.designerpack/business.svg"
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
                                    src="./ionicons.designerpack/ticket-outline.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Lugar evento masivo</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Club"
                                    src="./ionicons.designerpack/football.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Club</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Bed"
                                    src="./ionicons.designerpack/home.svg"
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