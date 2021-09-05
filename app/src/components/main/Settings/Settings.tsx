import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Footer from '../../shared/Footer/Footer';
import Header from '../../shared/Header/Header';
import ChangePasswordModal from '../../shared/Modals/Settings/ChangePasswordModal/ChangePasswordModal';
import { selectUser } from '../../store/store';

const Settings = () => {
    const user = useSelector(selectUser);

    const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);

    const handlePasswordChanged = () => {

    }

    return (
        <>
            <Header />

            <Container>
                <Row>
                    <Col>
                        <h1>Información del Usuario</h1>
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col>
                        <p><b>Nombre y Apellido:</b> {user.info?.name_lastname}</p>
                    </Col>

                    <Col>
                        <p><b>DNI:</b> {user.info?.name_lastname}</p>
                    </Col>

                    <Col>
                        <p><b>Organización:</b> {user.info?.organization}</p>
                    </Col>

                    <Col>
                        <p><b>Email:</b> {user.info?.email}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button
                            variant="danger"
                            onClick={() => setShowChangePasswordModal(true)}
                        >Cambiar contraseña</Button>
                    </Col>
                </Row>
            </Container>

            <Footer />

            {
                showChangePasswordModal &&
                <ChangePasswordModal
                    showModal={showChangePasswordModal}
                    handleClose={() => setShowChangePasswordModal(false)}
                    handlePasswordChanged={() => handlePasswordChanged()}
                />
            }
        </>
    )
}

export default Settings;