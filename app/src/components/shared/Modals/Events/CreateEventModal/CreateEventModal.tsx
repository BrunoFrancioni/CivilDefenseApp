import { Formik } from "formik";
import { CreateEventModalProps } from "./types";
import * as yup from 'yup';
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { ICreateEvent, ICreateEventInitialState } from "../../../../../core/interfaces/IEvents";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store/store";

import './styles.css';
import Swal from "sweetalert2";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

const CreateEventModal = (props: CreateEventModalProps) => {
    const user = useSelector(selectUser);

    const socket = socketIOClient(ENDPOINT);

    const initialState: ICreateEventInitialState = {
        title: '',
        description: '',
        event_type: '',
    };

    const event_types = [
        "Incendio",
        "Inundación",
        "Accidente de tránsito"
    ];

    const [position, setPosition] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        socket.on("Result Create Event", data => {
            console.log("Result Create Event", data);

            if (user.info && String(data.id) === user.info._id) {
                if (data.result === false) {
                    setLoading(false);

                    Swal.fire({
                        title: 'Ha ocurrido un error',
                        text: 'Intente nuevamente',
                        icon: 'error'
                    });
                } else {
                    setLoading(false);

                    props.handleEventCreated();
                }
            }
        });
    }, [])

    function LocationMarker() {
        useMapEvents({
            click(e: any) {
                console.log(e);
                setPosition([e.latlng.lat, e.latlng.lng]);
            }
        });

        return position === null ? null : (
            <Marker position={position}>
                <Popup>Usted eligió esas coordenadas</Popup>
            </Marker>
        )
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required("Requerido"),
        description: yup.string().required("Requerido"),
        event_type: yup.string().required("Requerido")
    });

    const handleSubmit = async (values: ICreateEventInitialState) => {
        setLoading(true);

        let date = new Date();
        date.setHours(date.getHours() - 3);

        if (position) {
            const createEvent: ICreateEvent = {
                title: values.title,
                description: values.description,
                altitude: String(position[1]),
                latitude: String(position[0]),
                event_type: values.event_type,
                date_time: date,
                creator: (user.info) ? user.info._id : ''
            }

            socket.emit("Create Event", createEvent);
        }
    }

    return (
        <Modal
            show={props.showModal}
            onHide={() => props.handleClose()}
            size="lg"
            animation={false}
            centered={true}
            onEscapeKeyDown={() => props.handleClose()}
        >
            <Modal.Header closeButton>
                <Modal.Title>Iniciar sesión</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={initialState}
                    validationSchema={validationSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);

                        handleSubmit(data);

                        setSubmitting(false);
                    }}
                >
                    {
                        ({
                            values,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            touched
                        }) => (
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <Form.Group controlId="title" className="position-relative">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese el título"
                                        defaultValue={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.title && !errors.title}
                                        isInvalid={!!errors.title}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.title}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group controlId="description" className="position-relative">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        as="textarea"
                                        rows={4}
                                        placeholder="Ingrese la descripción"
                                        defaultValue={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={!!errors.description}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.description}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group controlId="position" className="position-relative">
                                    <Form.Label>Coordinadas</Form.Label>

                                    <MapContainer center={[-34.584454, -60.951657]} zoom={14}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        />

                                        <LocationMarker />
                                    </MapContainer>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="event_type"
                                    className="position-relative"
                                >
                                    <Form.Label>Seleccione el tipo de evento</Form.Label>
                                    <Form.Control
                                        as="select"
                                        size="lg"
                                        defaultValue={values.event_type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.event_type && !errors.event_type}
                                        isInvalid={!!errors.event_type}
                                    >
                                        <option value={""}>Selecciona una opción</option>
                                        {
                                            event_types.map((types, index) => {
                                                return <option value={types} key={index}>
                                                    {types}
                                                </option>
                                            })
                                        }
                                    </Form.Control>

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.event_type}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <div className="center-container">
                                    <Button
                                        variant="success"
                                        type="submit"
                                        disabled={!position || isSubmitting}
                                    >
                                        Crear evento
                                    </Button>
                                </div>
                            </Form>
                        )}
                </Formik>

                {
                    loading &&
                    <div className="spinner-container">
                        <Spinner animation="border" role="status">
                        </Spinner>
                    </div>
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

export default CreateEventModal;