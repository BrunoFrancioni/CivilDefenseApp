import React, { useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import Header from "../../shared/Header/Header";
import Sidebar from "../../shared/Sidebar/Sidebar";
import ActiveEvents from "./ActiveEvents/ActiveEvents";
import InactiveEvents from "./InactiveEvents/InactiveEvents";

import './styles.css';

const Events = () => {
    const [activeView, setActiveView] = useState<boolean>(true);

    return (
        <>
            <Header />

            <Container>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>

                    <Col>
                        <h1>Eventos</h1>
                        <hr />

                        <Row>
                            <div className="buttons">
                                <ButtonGroup size="lg" className="mb-2">
                                    <Button
                                        onClick={() => setActiveView(true)}
                                    >Eventos activos</Button>

                                    <Button
                                        onClick={() => setActiveView(false)}
                                    >Eventos inactivos</Button>
                                </ButtonGroup>
                            </div>
                        </Row>

                        <Row>
                            {
                                activeView &&
                                <ActiveEvents />
                            }

                            {
                                !activeView &&
                                <InactiveEvents />
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Events;