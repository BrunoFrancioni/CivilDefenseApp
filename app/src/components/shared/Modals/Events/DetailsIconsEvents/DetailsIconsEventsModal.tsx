import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { DetailsIconsEventsModalProps } from './types';

import './styles.css';

const DetailsIconsEventsModal = (props: DetailsIconsEventsModalProps) => {
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
                <Modal.Title>Detalles de los Eventos</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Fire"
                                    src="./images/fire.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Incendio</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Flood"
                                    src="./images/flood.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Inundación</p>
                            </div>
                        </Col>

                        <Col>
                            <div className="container-col">
                                <img
                                    alt="Accident"
                                    src="./images/accident.svg"
                                    className="icon mr-2"
                                />
                                <p className="name">Accidente de tránsito</p>
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

export default DetailsIconsEventsModal;