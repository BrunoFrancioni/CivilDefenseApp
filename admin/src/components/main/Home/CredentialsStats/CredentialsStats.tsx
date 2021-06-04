import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Chart from 'react-google-charts';
import { IStatsCredentials } from '../../../../core/interfaces/IUsers';
import UsersService from '../../../../core/services/UsersService';

import './styles.css';

const CredentialsStats = () => {
    const usersService: UsersService = new UsersService();

    const [loading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<IStatsCredentials | null>(null);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getStats();
        })();
    }, [])

    const getStats = async () => {
        try {
            const result = await usersService.getStatsCredentials();

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
        <div className="container-credentials-stats">
            <h2 className="title-credentials-stats">Estadísticas de Credenciales</h2>

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
                <Row>
                    <Col md={4}>
                        <Card className="card-total-credentials">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h5>Total Credenciales</h5>
                                    </Col>

                                    <Col>
                                        <i className="fas fa-users icon-credentials"></i>
                                    </Col>
                                </Row>

                                <h1 className="mt-1 mb-3">{stats.totalCredentials}</h1>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="card-porcentaje-organization">
                            <Card.Title className="title-card-porcentaje-organization">
                                Porcentaje por tipo de Organización
                        </Card.Title>

                            <Card.Body>
                                <Chart
                                    width={'55rem'}
                                    height={'30rem'}
                                    chartType="PieChart"
                                    loader={<div className="spinner-container">Loading Chart</div>}
                                    data={[
                                        ['Organizacion', 'Total'],
                                        ['Bomberos', stats.statsOrganization.totalBomberos],
                                        ['Defensa Civil', stats.statsOrganization.totalDefensaCivil],
                                        ['Policia', stats.statsOrganization.totalPolicia]
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
            }
        </div>
    );
}

export default CredentialsStats;