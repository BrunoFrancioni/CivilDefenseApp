import React, { useEffect, useState } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { IEvent } from '../../../../core/interfaces/IEvents';
import EventsService from '../../../../core/services/EventsService';
import DetailsEventModal from '../../../shared/Modals/Events/DetailsEventModal/DetailsEventModal';
import Paginator from '../../../shared/Paginator/Paginator';
import { logOutAction } from '../../../store/user/user.slice';

const InactiveEvents = () => {
    const eventsService: EventsService = new EventsService();
    const dispatch = useDispatch();

    const initialStateActiveEvent: IEvent = {
        _id: '',
        title: '',
        description: '',
        coordinates: [],
        event_type: '',
        creator: {
            _id: '',
            name_lastname: '',
            dni: '',
            organization: '',
            email: ''
        },
        date_time: new Date(),
        active: false
    }

    const [loading, setLoading] = useState<boolean>(true);
    const [actualPage, setActualPage] = useState<number>(1);
    const [sizePage, setSizePage] = useState<number>(10);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);
    const [activeEvent, setActiveEvent] = useState<IEvent>(initialStateActiveEvent);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getEvents();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getEvents();
        })();
    }, [actualPage]);

    const getEvents = async () => {
        try {
            const result = await eventsService.getPaginateInactiveEvents(actualPage, sizePage);

            setTotalResults(result.data.totalResults);
            (result.data.events) ? setEvents(result.data.events) : setEvents([]);
            setSearchWithError(false);

            setLoading(false);
        } catch (e) {
            console.log('Error getting events', e);

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
                setTotalResults(0);
                setEvents([]);
                setSearchWithError(true);
                setLoading(false);
            }
        }
    }

    const firstLetterToUppercase = (value: string) => {
        return value.replace(value[0], value[0].toUpperCase());
    }

    const changePage = (number: number) => {
        if (actualPage != number) {
            setTotalResults(0);
            setEvents([]);
            setSearchWithError(false);
            setLoading(true);
            setActualPage(number);
        }
    }

    const handleDetailsClick = (event: IEvent) => {
        setActiveEvent(event);
        setShowDetailsModal(true);
    }

    const handleCloseDetailsModal = () => {
        setActiveEvent(initialStateActiveEvent);
        setShowDetailsModal(false);
    }

    const handleDeleteClick = (id: string) => {
        Swal.fire({
            title: '¿Está seguro que desea eliminar el evento?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const result = await eventsService.deleteEvent(id);

                    Swal.fire({
                        title: 'Evento eliminada correctamente',
                        icon: 'success'
                    }).then(() => {
                        setLoading(true);
                        setTotalResults(0);
                        setEvents([]);
                        setSearchWithError(false);
                        setActualPage(1);

                        getEvents();
                    });
                } catch (e) {
                    console.log('ERROR', e);

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
                            icon: 'error'
                        });
                    }
                }
            }
        });
    }

    return (
        <>
            <h2>Eventos Inactivos</h2>
            <br />

            {
                loading &&
                <div className="spinner-container">
                    <Spinner animation="border" role="status">
                    </Spinner>
                </div>
            }

            {
                !loading && searchWithError &&
                <Container fluid>
                    <p>
                        <i className="fas fa-exclamation-triangle">
                        </i> Ha ocurrido un error. Intente nuevamente.
                    </p>
                </Container>
            }

            {
                !loading && totalResults === 0 && !searchWithError &&
                <Container fluid>
                    <p>No se han encontrado resultados</p>
                </Container>
            }

            {
                !loading && totalResults != 0 &&
                events != [] && !searchWithError &&
                <Container fluid>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Tipo Evento</th>
                                <th>Creador</th>
                                <th>Tipo Creador</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                events.map(event => {
                                    return (
                                        <tr key={event._id}>
                                            <td>{event.title}</td>
                                            <td>{event.event_type}</td>
                                            <td>{event.creator.name_lastname}</td>
                                            <td>{firstLetterToUppercase(event.creator.organization)}</td>
                                            <td>
                                                <div className="container-options">
                                                    <span title="Ver detalles del evento">
                                                        <i
                                                            className="fas fa-info-circle option"
                                                            onClick={() => handleDetailsClick(event)}
                                                        ></i>
                                                    </span>
                                                    <span title="Eliminar evento">
                                                        <i
                                                            className="fas fa-minus-square option"
                                                            onClick={() => handleDeleteClick(event._id)}
                                                        ></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>

                    <Paginator
                        active={actualPage}
                        totalResults={totalResults}
                        sizePage={sizePage}
                        changePage={changePage.bind(this)}
                    />
                </Container>
            }

            {
                showDetailsModal &&
                <DetailsEventModal
                    showModal={showDetailsModal}
                    event={activeEvent}
                    handleClose={handleCloseDetailsModal}
                />
            }
        </>
    )
}

export default InactiveEvents;