import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IEntity } from "../../../core/interfaces/IEntities";
import { IEvent } from "../../../core/interfaces/IEvents";
import EntitiesService from "../../../core/services/EntitiesService";
import EventsService from "../../../core/services/EventsService";
import Footer from "../../shared/Footer/Footer";
import CreateEventModal from "../../shared/Modals/Events/CreateEventModal/CreateEventModal";
import { selectUser } from "../../store/store";
import { logOutAction } from "../../store/user/user.slice";

const Home = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const entitiesService: EntitiesService = new EntitiesService();
    const eventsService: EventsService = new EventsService();

    const [entities, setEntities] = useState<IEntity[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [showModalCreateEvent, setShowModalCreateEvent] = useState<boolean>(false);

    const iconFire = new L.Icon({
        iconUrl: './images/fire.svg',
        iconRetinaUrl: './images/fire.svg',
        iconSize: new L.Point(50, 65)
    });

    const iconFlood = new L.Icon({
        iconUrl: './images/flood.svg',
        iconRetinaUrl: './images/flood.svg',
        iconSize: new L.Point(50, 65)
    });

    const iconAccident = new L.Icon({
        iconUrl: './images/accident.svg',
        iconRetinaUrl: './images/accident.svg',
        iconSize: new L.Point(50, 65)
    });

    useEffect(() => {
        (async () => {
            await getEntities();

            await getActiveEvents();
        })();
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
                                    return (
                                        <Marker
                                            key={entity._id}
                                            position={[Number(entity.coordinates[1]), Number(entity.coordinates[0])]}
                                        >
                                            <Popup>
                                                {entity.name}
                                            </Popup>
                                        </Marker>
                                    )
                                })
                            }

                            {
                                events !== [] &&
                                events.map(event => {
                                    if (event.event_type === 'Incendio') {
                                        return (
                                            <Marker
                                                key={event._id}
                                                position={[Number(event.coordinates[1]), Number(event.coordinates[0])]}
                                                icon={iconFire}
                                            >
                                                <Popup>
                                                    {event.title}
                                                </Popup>
                                            </Marker>
                                        )
                                    } else if (event.event_type === 'Inundación') {
                                        return (
                                            <Marker
                                                key={event._id}
                                                position={[Number(event.coordinates[1]), Number(event.coordinates[0])]}
                                                icon={iconFlood}
                                            >
                                                <Popup>
                                                    {event.title}
                                                </Popup>
                                            </Marker>
                                        )
                                    } else {
                                        return (
                                            <Marker
                                                key={event._id}
                                                position={[Number(event.coordinates[1]), Number(event.coordinates[0])]}
                                                icon={iconAccident}
                                            >
                                                <Popup>
                                                    {event.title}
                                                </Popup>
                                            </Marker>
                                        )
                                    }
                                })
                            }
                        </MapContainer>
                    </Col>
                </Row>

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