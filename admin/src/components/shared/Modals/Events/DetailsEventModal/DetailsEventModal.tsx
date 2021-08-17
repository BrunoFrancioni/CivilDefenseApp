import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { DetailsEventModalProps } from './types';

const DetailsEventModal = (props: DetailsEventModalProps) => {
    const firstLetterToUppercase = (value: string) => {
        return value.replace(value[0], value[0].toUpperCase());
    }

    const parseDate = (value: Date) => {
        let finalResult = "";

        const year = String(value).slice(0, 4);
        const month = String(value).slice(5, 7);
        const day = String(value).slice(8, 10);

        const time = String(value).slice(11, 19);

        finalResult += day;
        finalResult += '/';
        finalResult += month;
        finalResult += '/';
        finalResult += year;
        finalResult += ' ';
        finalResult += time;

        return finalResult;
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
                <Modal.Title>Detalles del Evento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <h4>Título</h4>
                            <p>{props.event.title}</p>
                        </Col>

                        <Col>
                            <h4>Tipo de Evento</h4>
                            <p>{props.event.event_type}</p>
                        </Col>

                        <Col>
                            <h4>Fecha y Hora</h4>
                            <p>{parseDate(props.event.date_time)}</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h4>Descripción</h4>
                            <p>{props.event.description}</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h4>Coordenadas</h4>
                            <p><b>Longitud: </b> {props.event.coordinates[0]}</p>
                            <p><b>Latitud: </b> {props.event.coordinates[1]}</p>
                        </Col>

                        <Col>
                            <h4>Creador</h4>
                            <p><b>Nombre: </b> {props.event.creator.name_lastname}</p>
                            <p>
                                <b>Tipo de Creador: </b>{props.event.creator.organization.length > 1 ?
                                    firstLetterToUppercase(props.event.creator.organization) : ''}
                            </p>
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
    )
}

export default DetailsEventModal;