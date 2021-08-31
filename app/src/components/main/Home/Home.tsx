import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { SocketContext } from "../../../core/contexts/socket";
import { IEntity } from "../../../core/interfaces/IEntities";
import { IEvent } from "../../../core/interfaces/IEvents";
import EntitiesService from "../../../core/services/EntitiesService";
import EventsService from "../../../core/services/EventsService";
import {
    iconBed,
    iconClub,
    iconEvents,
    iconGasStation,
    iconHospital,
    iconMunicipality,
    iconSchool
} from "../../../core/utils/MapMarkers/EntitiesMapMarkers";
import {
    iconAccident,
    iconFire,
    iconFlood
} from "../../../core/utils/MapMarkers/EventsMapMarkers";
import Footer from "../../shared/Footer/Footer";
import CreateEventModal from "../../shared/Modals/Events/CreateEventModal/CreateEventModal";
import { selectUser } from "../../store/store";
import { logOutAction } from "../../store/user/user.slice";

const Home = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const entitiesService: EntitiesService = new EntitiesService();
    const eventsService: EventsService = new EventsService();

    const socket = useContext(SocketContext);

    const [entities, setEntities] = useState<IEntity[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [showModalCreateEvent, setShowModalCreateEvent] = useState<boolean>(false);

    const [showSchools, setShowSchools] = useState<boolean>(true);
    const [showHospitals, setShowHospitals] = useState<boolean>(true);
    const [showGasStation, setShowGasStation] = useState<boolean>(true);
    const [showMunicipality, setShowMunicipality] = useState<boolean>(true);
    const [showEvents, setShowEvents] = useState<boolean>(true);
    const [showClub, setShowClub] = useState<boolean>(true);
    const [showBed, setShowBed] = useState<boolean>(true);

    const showIconEntities = (value: string) => {
        switch (value) {
            case 'educación':
                return showSchools;
            case 'centro salud':
                return showHospitals;
            case 'depósito combustible':
                return showGasStation;
            case 'organismo público':
                return showMunicipality;
            case 'lugar evento masivo':
                return showEvents;
            case 'club':
                return showClub;
            case 'hogar acogida':
                return showBed;
        }
    }

    const [showFire, setShowFire] = useState<boolean>(true);
    const [showFlood, setShowFlood] = useState<boolean>(true);
    const [showAccident, setShowAccident] = useState<boolean>(true);

    const showIconEvents = (value: string) => {
        switch (value) {
            case 'Incendio':
                return showFire;
            case 'Inundación':
                return showFlood;
            case 'Accidente de tránsito':
                return showAccident;
        }
    }

    const iconsEntity = (value: string) => {
        switch (value) {
            case 'educación':
                return iconSchool;
            case 'centro salud':
                return iconHospital;
            case 'depósito combustible':
                return iconGasStation;
            case 'organismo público':
                return iconMunicipality;
            case 'lugar evento masivo':
                return iconEvents;
            case 'club':
                return iconClub;
            case 'hogar acogida':
                return iconBed;
        }
    }

    const iconsEvents = (value: string) => {
        switch (value) {
            case 'Incendio':
                return iconFire;
            case 'Inundación':
                return iconFlood;
            case 'Accidente de tránsito':
                return iconAccident;
        }
    }

    useEffect(() => {
        (async () => {
            await getEntities();

            await getActiveEvents();
        })();

        socket.on("New Event", (data: any) => {
            console.log("Nuevo evento", data);

            if (user.info && String(data.id) !== user.info._id) {
                Swal.fire({
                    position: 'bottom-start',
                    icon: 'info',
                    title: 'Nuevo evento',
                    html:
                        `<b>Título del evento:</b> ${data.event.title} <br />
                        <b>Descripción:</b> ${data.event.description} <br />
                        <b>Tipo de evento:</b> ${data.event.event_type}`,
                    showConfirmButton: false,
                    timer: 3000
                });
            }

            getActiveEvents();
        });
    }, []);

    const getEntities = async () => {
        try {
            const result = await entitiesService.getEntities();

            setEntities(result.data.entities);
        } catch (e) {
            console.log('Error getting entities', e);

            setEntities([]);
        }
    }

    const getActiveEvents = async () => {
        try {
            const result = await eventsService.getActiveEvents();

            setEvents(result.data.events);
        } catch (e) {
            console.log("ERROR", e);

            if (e.response.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    title: 'La sesión ha expirado',
                    text: 'Por favor, iníciela de nuevo.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    localStorage.removeItem('token');

                    dispatch(logOutAction({ logged: false, info: null }));
                });
            } else {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Intente nuevamente',
                    icon: 'error'
                });
            }
        }
    }

    const handleEventCreated = () => {
        setShowModalCreateEvent(false);

        Swal.fire({
            title: 'Evento creado correctamente',
            icon: 'success'
        }).then(() => {
            getActiveEvents();
        });
    }

    return (
        <div>
            <Container>
                <Row className="mb-2">
                    <Col>
                        <h3>Filtros para las Entidades</h3>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Check
                                inline
                                id="schools"
                                checked={showSchools}
                                label="Educación"
                                onChange={() => setShowSchools(!showSchools)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="hospitals">
                            <Form.Check
                                inline
                                id="hospitals"
                                checked={showHospitals}
                                label="Centro salud"
                                onChange={() => setShowHospitals(!showHospitals)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="gasStation">
                            <Form.Check
                                inline
                                id="gasStation"
                                checked={showGasStation}
                                label="Depósito combustible"
                                onChange={() => setShowGasStation(!showGasStation)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="municipality">
                            <Form.Check
                                inline
                                id="municipality"
                                checked={showMunicipality}
                                label="Organismo público"
                                onChange={() => setShowMunicipality(!showMunicipality)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="events">
                            <Form.Check
                                inline
                                id="events"
                                checked={showEvents}
                                label="Lugar evento masivo"
                                onChange={() => setShowEvents(!showEvents)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="club">
                            <Form.Check
                                inline
                                id="club"
                                checked={showClub}
                                label="Club"
                                onChange={() => setShowClub(!showClub)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="bed">
                            <Form.Check
                                inline
                                id="bed"
                                checked={showBed}
                                label="Hogar acogida"
                                onChange={() => setShowBed(!showBed)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <hr />

                <Row className="mb-2">
                    <Col>
                        <h3>Filtros para los Eventos</h3>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="fire">
                            <Form.Check
                                inline
                                id="fire"
                                checked={showFire}
                                label="Incendio"
                                onChange={() => setShowFire(!showFire)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="flood">
                            <Form.Check
                                inline
                                id="flood"
                                checked={showFlood}
                                label="Inundación"
                                onChange={() => setShowFlood(!showFlood)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="accident">
                            <Form.Check
                                inline
                                id="accident"
                                checked={showAccident}
                                label="Accidente de tránsito"
                                onChange={() => setShowAccident(!showAccident)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col>
                        <MapContainer
                            style={{ width: '90%', height: '500px', margin: '0 auto' }}
                            center={[-34.584454, -60.951657]}
                            zoom={14}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />

                            {
                                entities !== [] &&
                                entities.map(entity => {
                                    if (showIconEntities(entity.entityType)) {
                                        return (
                                            <Marker
                                                key={entity._id}
                                                position={[Number(entity.coordinates[1]), Number(entity.coordinates[0])]}
                                                icon={iconsEntity(entity.entityType)}
                                            >
                                                <Popup>
                                                    {entity.name}
                                                </Popup>
                                            </Marker>
                                        )
                                    }

                                    return <Marker key={entity._id} position={[0, 0]}></Marker>
                                })
                            }

                            {
                                events !== [] &&
                                events.map(event => {
                                    if (showIconEvents(event.event_type)) {
                                        return (
                                            <Marker
                                                key={event._id}
                                                position={[Number(event.coordinates[1]), Number(event.coordinates[0])]}
                                                icon={iconsEvents(event.event_type)}
                                            >
                                                <Popup>
                                                    {event.title}
                                                </Popup>
                                            </Marker>
                                        )
                                    }

                                    return <Marker key={event._id} position={[0, 0]}></Marker>
                                })
                            }
                        </MapContainer>
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col>
                        {
                            user.logged &&
                            <Button
                                variant="primary"
                                onClick={() => setShowModalCreateEvent(true)}
                            >Crear Evento</Button>
                        }
                    </Col>
                </Row>
            </Container>

            <Footer />

            {
                showModalCreateEvent &&
                <CreateEventModal
                    showModal={showModalCreateEvent}
                    handleEventCreated={() => handleEventCreated()}
                    handleClose={() => setShowModalCreateEvent(false)}
                />
            }
        </div>
    );
}

export default Home;