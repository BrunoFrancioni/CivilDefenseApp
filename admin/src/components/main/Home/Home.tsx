import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Footer from '../../shared/Footer/Footer';
import Header from '../../shared/Header/Header';
import Sidebar from '../../shared/Sidebar/Sidebar';
import { selectUser } from '../../store/store';
import CredentialsStats from './CredentialsStats/CredentialsStats';
import EntitiesStats from './EntitiesStats/EntitiesStats';
import EventsStats from './EventsStats/EventsStats';

const Home: React.FC = () => {
    const user = useSelector(selectUser);
    
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

                        {
                            user.logged &&
                            <>
                                <CredentialsStats />

                                <EntitiesStats />

                                <EventsStats />
                            </>
                        }
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default Home;