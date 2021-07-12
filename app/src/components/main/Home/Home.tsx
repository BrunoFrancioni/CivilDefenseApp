import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { IEntity } from "../../../core/interfaces/IEntities";
import EntitiesService from "../../../core/services/EntitiesService";
import { logOutAction } from "../../store/user/user.slice";

const Home = () => {
    const entitiesService: EntitiesService = new EntitiesService();
    const dispatch = useDispatch();

    const [entities, setEntities] = useState<IEntity[]>([]);

    useEffect(() => {
        (async () => {
            await getEntities();
        })();
    }, []);

    const getEntities = async () => {
        try {
            const result = await entitiesService.getEntities();

            setEntities(result.data.entities);
        } catch (e) {
            console.log('Error getting entities', e);

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
                setEntities([]);
            }
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <MapContainer center={[-34.584454, -60.951657]} zoom={14}>
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
                                    >
                                        <Popup>
                                            {entity.name}
                                        </Popup>
                                    </Marker>
                                )
                            })
                        }
                    </MapContainer>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;