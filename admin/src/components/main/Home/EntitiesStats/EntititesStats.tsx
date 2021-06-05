import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Chart from 'react-google-charts';
import { IStatsEntities } from '../../../../core/interfaces/IEntities';
import EntitiesService from '../../../../core/services/EntitiesService';

import './styles.css';

const EntitiesStats = () => {
    const entitiesService: EntitiesService = new EntitiesService();

    const [loading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<IStatsEntities | null>(null);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getStats();
        })();
    }, []);

    const getStats = async () => {
        try {
            const result = await entitiesService.getStatsEntities();

            if (result.status === 200) {
                setLoading(false);
                setStats(result.data.stats);
                setSearchWithError(false);
            } else {
                setLoading(false);
                setStats(null);
                setSearchWithError(true);
            }
        } catch (e) {
            console.log('ERROR', e);

            setLoading(false);
            setStats(null);
            setSearchWithError(true);
        }
    }

    return (
        <div>
            <h2 className="title-entities-stats">Estadísticas de Entidades</h2>

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
                        <Col md={4}>
                            <Card className="card-total-entities">
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <h5>Total Entidades</h5>
                                        </Col>

                                        <Col>
                                            <i className="fas fa-building icon-entities"></i>
                                        </Col>
                                    </Row>

                                    <h1 className="mt-1 mb-3">{stats.totalEntities}</h1>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card className="card-porcentaje-entities">
                                <Card.Title className="title-card-porcentaje-entities">
                                    <b>Porcentaje por tipo de Entidad</b>
                                </Card.Title>

                                <Card.Body>
                                    <Chart
                                        width={'55rem'}
                                        height={'30rem'}
                                        chartType="PieChart"
                                        loader={
                                            <div className="spinner-container">
                                                <Spinner animation="border" role="status">
                                                </Spinner>
                                            </div>
                                        }
                                        data={[
                                            ['Entidad', 'Total'],
                                            ['Educación', stats.statsEntityType.totalEducacion],
                                            ['Centro de Salud', stats.statsEntityType.totalCentroSalud],
                                            ['Depósito de Combustible', stats.statsEntityType.totalDepositoCombustible],
                                            ['Organismo Público', stats.statsEntityType.totalOrganismoPublico],
                                            ['Lugar de Evento Masivo', stats.statsEntityType.totalLugarEventoMasivo],
                                            ['Club', stats.statsEntityType.totalClub],
                                            ['Hogar de Acogida', stats.statsEntityType.totalHogarAcogida]
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

                    <Row>
                        <Col>
                            <Card className="card-porcentaje-entities">
                                <Card.Title className="title-card-porcentaje-entities">
                                    <b>Porcentaje por sector de Entidad</b>
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
                                            ['Entidad', 'Total'],
                                            ['Privada', stats.statsSector.totalPrivada],
                                            ['Público', stats.statsSector.totalPublico],
                                            ['Estatal', stats.statsSector.totalEstatal]
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
                            <Card className="card-porcentaje-entities">
                                <Card.Title className="title-card-porcentaje-entities">
                                    <b>Porcentaje por riesgo de Entidad</b>
                                </Card.Title>

                                <Card.Body>
                                    <Chart
                                        width={'35rem'}
                                        height={'30rem'}
                                        chartType="PieChart"
                                        loader={
                                            <div className="spinner-container">
                                                <Spinner animation="border" role="status">
                                                </Spinner>
                                            </div>
                                        }
                                        data={[
                                            ['Entidad', 'Total'],
                                            ['Incendio', stats.statsRisk.totalIncendio],
                                            ['Inundación', stats.statsRisk.totalInundacion],
                                            ['Accidente', stats.statsRisk.totalAccidente],
                                            ['Amenaza Climática', stats.statsRisk.totalAmenazaClimatica]
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

export default EntitiesStats;