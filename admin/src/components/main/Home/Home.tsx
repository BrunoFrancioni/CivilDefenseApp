import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../../shared/Footer/Footer';
import Header from '../../shared/Header/Header';
import Sidebar from '../../shared/Sidebar/Sidebar';
import CredentialsStats from './CredentialsStats/CredentialsStats';
import EntitiesStats from './EntitiesStats/EntitiesStats';
import EventsStats from './EventsStats/EventsStats';

const Home: React.FC = () => {
    return (
        <>
            <Header />

            <Container>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>

                    <Col>
                        <h1>Inicio</h1>

                        <hr />

                        <CredentialsStats />

                        <EntitiesStats />

                        <EventsStats />
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default Home;