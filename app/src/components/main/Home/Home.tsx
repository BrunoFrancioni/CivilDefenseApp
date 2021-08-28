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

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

const Home = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const entitiesService: EntitiesService = new EntitiesService();
    const eventsService: EventsService = new EventsService();

    const socket = socketIOClient(ENDPOINT);

    const [entities, setEntities] = useState<IEntity[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [showModalCreateEvent, setShowModalCreateEvent] = useState<boolean>(false);

    const iconSchool = new L.Icon({
        iconUrl: './images/marker-school.svg',
        iconRetinaUrl: './images/marker-school.svg',
        iconSize: new L.Point(50, 65)
    });

    const iconHospital = new L.Icon({
        iconUrl: './images/marker-hospital.svg',
        iconRetinaUrl: './images/marker-hospital.svg',
        iconSize: new L.Point(50, 65)
    });

    const iconGasStation = new L.Icon({
        iconUrl: './images/marker-gas-station.svg',
        iconRetinaUrl: './images/marker-gas-station.svg',
        iconSize: new L.Point(50, 65)
    });

    const iconMunicipality = new L.Icon({
        iconUrl: './images/marker-municipality.svg',
        iconRetinaUrl: './images/marker-municipality.svg',
        iconSize: new L.Point(50, 65)
    });

    const iconEvents = new L.Icon({
        iconUrl: './images/marker-events.svg',
        iconRetinaUrl: './images/marker-events.svg',
        iconSize: new L.Point(50, 65)
    });

    const iconClub = new L.Icon({
        iconUrl: './images/marker-sport.svg',
        iconRetinaUrl: './images/marker-sport.svg',
        iconSize: new L.Point(50, 65)
    });

    const iconBed = new L.Icon({
        iconUrl: './images/marker-bed.svg',
        iconRetinaUrl: './images/marker-bed.svg',
        iconSize: new L.Point(50, 65)
    });

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

        socket.on("New Event", data => {
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
                                            icon={iconsEntity(entity.entityType)}
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