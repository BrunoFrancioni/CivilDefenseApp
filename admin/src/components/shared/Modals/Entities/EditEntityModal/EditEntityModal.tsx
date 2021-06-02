import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { IEditEntity, IEntity } from '../../../../../core/interfaces/IEntities';
import EntitiesService from '../../../../../core/services/EntitiesService';
import { EditEntityModalProps } from './types';

const EditEntityModal = (props: EditEntityModalProps) => {
    const entitiesService: EntitiesService = new EntitiesService();

    const initialStateEntity: IEntity = {
        _id: '',
        name: '',
        entityType: '',
        legalNumber: '',
        address: '',
        phone: '',
        postalCode: '',
        email: '',
        sector: '',
        risk: [],
        coordinates: ['', '']
    }

    const initialStateEditEntity: IEditEntity = {
        name: '',
        entityType: '',
        address: '',
        phone: '',
        postalCode: '',
        sector: '',
        risk: [],
        coordinates: ['', '']
    }

    const [loading, setLoading] = useState<boolean>(true);
    const [entity, setEntity] = useState<IEntity>(initialStateEntity);
    const [editEntity, setEditEntity] = useState<IEditEntity>(initialStateEditEntity);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getEntity();
        })();
    }, []);

    const getEntity = async () => {
        try {
            const result = await entitiesService.getEntity(props.id);

            if (result.status === 200) {
                setEntity(result.data.entity);
                setLoading(false);
                setEditEntity({
                    name: result.data.entity.name,
                    entityType: result.data.entity.entityType,
                    address: result.data.entity.address,
                    phone: result.data.entity.phone,
                    postalCode: result.data.entity.postalCode,
                    sector: result.data.entity.sector,
                    risk: result.data.entity.risk,
                    coordinates: result.data.entity.coordinates
                });
                setSearchWithError(false);
            } else {
                setEntity(initialStateEntity);
                setLoading(false);
                setEditEntity(initialStateEditEntity);
                setSearchWithError(true);
            }
        } catch (e) {
            console.log('Error', e);

            setEntity(initialStateEntity);
            setLoading(false);
            setEditEntity({
                name: '',
                entityType: '',
                address: '',
                phone: '',
                postalCode: '',
                sector: '',
                risk: [],
                coordinates: ['', '']
            });
            setSearchWithError(true);
        }
    }

    const handleChangesName = (value: string) => {
        setEditEntity({
            ...editEntity,
            name: value
        });
    }

    const handleChangesEntityType = (value: string) => {
        setEditEntity({
            ...editEntity,
            entityType: value
        });
    }

    const handleChangesAddress = (value: string) => {
        setEditEntity({
            ...editEntity,
            address: value
        });
    }

    const handleChangesPhone = (value: string) => {
        setEditEntity({
            ...editEntity,
            phone: value
        });
    }

    const handleChangesPostalCode = (value: string) => {
        setEditEntity({
            ...editEntity,
            postalCode: value
        });
    }

    const handleChangesSector = (value: string) => {
        setEditEntity({
            ...editEntity,
            sector: value
        });
    }

    const handleChangesRisk = (id: string) => {
        const value = editEntity.risk.find((v) => v == id);

        if (value) {
            setEditEntity({
                ...editEntity,
                risk: editEntity.risk.filter((v) => v != id)
            });
        } else {
            setEditEntity({
                ...editEntity,
                risk: [...editEntity.risk, id]
            });
        }
    }

    const handleChangesLongitude = (value: string) => {
        setEditEntity({
            ...editEntity,
            coordinates: [value, editEntity.coordinates[1]]
        });
    }

    const handleChangesLatitud = (value: string) => {
        setEditEntity({
            ...editEntity,
            coordinates: [editEntity.coordinates[0], value]
        });
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const result = await entitiesService.editEntity(props.id, editEntity);

            if (result.status === 200) {
                props.handleEntityEdited();
            } else {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Intente nuevamente',
                    icon: 'error'
                });
            }
        } catch (e) {
            console.log("ERROR", e);

            Swal.fire({
                title: 'Ha ocurrido un error',
                text: 'Intente nuevamente',
                icon: 'error'
            });
        }
    }

    return (
        <Modal
            show={props.showModal}
            onHide={props.handleClose}
            size="lg"
            animation={false}
            centered={true}
            onEscapeKeyDown={props.handleClose}
            onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Entidad</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    loading &&
                    <div className="spinner-container">
                        <Spinner animation="border" role="status">
                        </Spinner>
                    </div>
                }

                {
                    loading && searchWithError &&
                    <Container fluid>
                        <p><i className="fas fa-exclamation-triangle"></i> Ha ocurrido un error. Intente nuevamente.</p>
                    </Container>
                }

                {
                    !loading && !searchWithError &&
                    entity != null &&
                    <Form>
                        <Form.Group controlId="formNameLastname">
                            <Form.Label>Nombre Entidad</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese el nombre de la entidad"
                                required
                                defaultValue={editEntity.name}
                                onChange={e => handleChangesName(e.target.value)}
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formEntityType">
                            <Form.Label>Tipo de entidad</Form.Label>
                            <Form.Control
                                as="select"
                                size="lg"
                                required
                                defaultValue={editEntity.entityType}
                                onChange={e => handleChangesEntityType(e.target.value)}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="educación">Educación</option>
                                <option value="centro salud">Centro salud</option>
                                <option value="depósito combustible">Depósito combustible</option>
                                <option value="organismo público">Organismo público</option>
                                <option value="lugar evento masivo">Lugar evento masivo</option>
                                <option value="club">Club</option>
                                <option value="hogar acogida">Hogar acogida</option>
                            </Form.Control>
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formLegalNumber">
                            <Form.Label>Numero Legal</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese el numero legal"
                                defaultValue={entity.legalNumber}
                                readOnly
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese la dirección"
                                required
                                defaultValue={editEntity.address}
                                onChange={e => handleChangesAddress(e.target.value)}
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese el teléfono"
                                required
                                defaultValue={editEntity.phone}
                                onChange={e => handleChangesPhone(e.target.value)}
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formPostalCode">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese el código postal"
                                required
                                defaultValue={editEntity.postalCode}
                                onChange={e => handleChangesPostalCode(e.target.value)}
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese el email"
                                defaultValue={entity.email}
                                readOnly
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formSector">
                            <Form.Label>Sector</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese el sector"
                                required
                                defaultValue={editEntity.sector}
                                onChange={e => handleChangesSector(e.target.value)}
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formRisk">
                            <Form.Label>Seleccione los riesgos de la entidad</Form.Label>

                            <Form.Check
                                type="checkbox"
                                id="incendio"
                                value="incendio"
                                label="Incendio"
                                checked={(editEntity.risk && editEntity.risk.includes('incendio')) ? true : false}
                                onChange={e => handleChangesRisk(e.target.value)}
                            />

                            <Form.Check
                                type="checkbox"
                                id="inundación"
                                value="inundación"
                                label="Inundación"
                                checked={(editEntity.risk && editEntity.risk.includes('inundación')) ? true : false}
                                onChange={e => handleChangesRisk(e.target.value)}
                            />

                            <Form.Check
                                type="checkbox"
                                id="accidente"
                                value="accidente"
                                label="Accidente"
                                checked={(editEntity.risk && editEntity.risk.includes('accidente')) ? true : false}
                                onChange={e => handleChangesRisk(e.target.value)}
                            />

                            <Form.Check
                                type="checkbox"
                                id="amenaza climática"
                                value="amenaza climática"
                                label="Amenaza climática"
                                checked={(editEntity.risk && editEntity.risk.includes('amenaza climática')) ? true : false}
                                onChange={e => handleChangesRisk(e.target.value)}
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formCoordinates">
                            <Form.Label>Coordenadas</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese la longitud"
                                required
                                defaultValue={editEntity.coordinates[0]}
                                onChange={e => handleChangesLongitude(e.target.value)}
                            />
                        </Form.Group>

                        <br />

                        <Form.Group controlId="formLatitud">
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Ingrese la latitud"
                                required
                                defaultValue={editEntity.coordinates[1]}
                                onChange={e => handleChangesLatitud(e.target.value)}
                            />
                        </Form.Group>

                        <br />

                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}

export default EditEntityModal;