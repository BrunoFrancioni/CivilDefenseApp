import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Footer from '../../shared/Footer/Footer';
import ChangePasswordModal from '../../shared/Modals/Settings/ChangePasswordModal/ChangePasswordModal';
import { selectUser } from '../../store/store';

import './styles.css'

const Settings = () => {
    const user = useSelector(selectUser);

    const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);

    const handlePasswordChanged = () => {
        setShowChangePasswordModal(false);

        Swal.fire({
            title: 'Contraseña cambiada correctamente',
            icon: 'success'
        });
    }

    return (
        <>
            <div className="settings-container">
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

                    <hr />

                    <Row>
                        <Col xl={{ order: 'last' }}>
                            <Button
                                variant="danger button-password"
                                onClick={() => setShowChangePasswordModal(true)}
                            >Cambiar contraseña</Button>
                        </Col>
                    </Row>
                </Container>

                {
                    showChangePasswordModal &&
                    <ChangePasswordModal
                        showModal={showChangePasswordModal}
                        handleClose={() => setShowChangePasswordModal(false)}
                        handlePasswordChanged={() => handlePasswordChanged()}
                    />
                }
            </div>

            <Footer />
        </>
    )
}

export default Settings;