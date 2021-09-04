import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Chart from 'react-google-charts';
import Swal from 'sweetalert2';
import { IStatsEvents } from '../../../../core/interfaces/IEvents';
import EventsService from '../../../../core/services/EventsService';
import { logOutAction } from '../../../store/user/user.slice';

import './styles.css';

const EventsStats = () => {
    const eventsService: EventsService = new EventsService();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<IStatsEvents | null>(null);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getStats();
        })();
    }, []);

    const getStats = async () => {
        try {
            const result = await eventsService.getEventsStats();

            (result.data.stats) ? setStats(result.data.stats) : setStats(null);
            setSearchWithError(false);
            setLoading(false);
        } catch (e: any) {
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
                setStats(null);
                setSearchWithError(true);
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <h2 className="title-events-stats">Estadísticas de los Eventos</h2>

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
                <Container fluid className="error-container">
                    <p><i className="fas fa-exclamation-triangle"></i> Ha ocurrido un error. Intente nuevamente.</p>
                </Container>
            }

            {
                !loading && !searchWithError &&
                stats != null &&
                <div>
                    <Row className="container-first-line">
                        <Col>
                            <Card className="card-total-events">
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <h5>Total Eventos Activos</h5>
                                        </Col>

                                        <Col>
                                            <i className="fas fa-medkit icon-events"></i>
                                        </Col>
                                    </Row>

                                    <h1 className="mt-1 mb-3">{stats.totalActiveEvents}</h1>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card className="card-total-events">
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <h5>Total Eventos Inactivos</h5>
                                        </Col>

                                        <Col>
                                            <i className="fas fa-medkit icon-events"></i>
                                        </Col>
                                    </Row>

                                    <h1 className="mt-1 mb-3">{stats.totalInactiveEvents}</h1>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card className="card-porcentaje-events">
                                <Card.Title className="title-card-porcentaje-events">
                                    <b>Porcentaje por Tipo de Evento Activo</b>
                                </Card.Title>

                                <Card.Body>
                                    <Chart
                                        width={'40rem'}
                                        height={'30rem'}
                                        chartType="PieChart"
                                        loader={
                                            <div className="spinner-container">
                                                <Spinner animation="border" role="status">
                                                </Spinner>
                                            </div>
                                        }
                                        data={[
                                            ['Tipo Entidad', 'Total'],
                                            ['Inundacion', stats.statsActiveEventType.totalInundacion],
                                            ['Incendio', stats.statsActiveEventType.totalIncendio],
                                            ['Accidente de Transito', stats.statsActiveEventType.totalAccidenteTransito]
                                        ]}
                                        options={{
                                            is3D: true,
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card className="card-porcentaje-events">
                                <Card.Title className="title-card-porcentaje-events">
                                    <b>Porcentaje por Tipo de Evento Inactivo</b>
                                </Card.Title>

                                <Card.Body>
                                    <Chart
                                        width={'40rem'}
                                        height={'30rem'}
                                        chartType="PieChart"
                                        loader={
                                            <div className="spinner-container">
                                                <Spinner animation="border" role="status">
                                                </Spinner>
                                            </div>
                                        }
                                        data={[
                                            ['Tipo Entidad', 'Total'],
                                            ['Inundacion', stats.statsInactiveEventType.totalInundacion],
                                            ['Incendio', stats.statsInactiveEventType.totalIncendio],
                                            ['Accidente de Transito', stats.statsInactiveEventType.totalAccidenteTransito]
                                        ]}
                                        options={{
                                            is3D: true,
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
}

export default EventsStats;