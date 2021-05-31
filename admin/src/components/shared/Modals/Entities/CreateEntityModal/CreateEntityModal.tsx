import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ICreateEntity } from '../../../../../core/interfaces/IEntities';
import EntitiesService from '../../../../../core/services/EntitiesService';
import { CreateEntityModalProps } from './types';

const CreateEntityModal = (props: CreateEntityModalProps) => {
    const initialStateEntity: ICreateEntity = {
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

    const [createEntity, setCreateEntity] = useState<ICreateEntity>(initialStateEntity);

    const entitiesService: EntitiesService = new EntitiesService();

    const handleChangesName = (value: string) => {
        setCreateEntity({
            ...createEntity,
            name: value
        });
    }

    const handleChangesEntityType = (value: string) => {
        setCreateEntity({
            ...createEntity,
            entityType: value
        });
    }

    const handleChangesLegalNumber = (value: string) => {
        setCreateEntity({
            ...createEntity,
            legalNumber: value
        });
    }

    const handleChangesAddress = (value: string) => {
        setCreateEntity({
            ...createEntity,
            address: value
        });
    }

    const handleChangesPhone = (value: string) => {
        setCreateEntity({
            ...createEntity,
            phone: value
        });
    }

    const handleChangesPostalCode = (value: string) => {
        setCreateEntity({
            ...createEntity,
            postalCode: value
        });
    }

    const handleChangesEmail = (value: string) => {
        setCreateEntity({
            ...createEntity,
            email: value
        });
    }

    const handleChangesSector = (value: string) => {
        setCreateEntity({
            ...createEntity,
            sector: value
        });
    }

    const handleChangesRisk = (id: string) => {
        const value = createEntity.risk.find((v) => v == id);

        if (value) {
            setCreateEntity({
                ...createEntity,
                risk: createEntity.risk.filter((v) => v != id)
            });
        } else {
            setCreateEntity({
                ...createEntity,
                risk: [...createEntity.risk, id]
            });
        }
    }

    const handleChangesLongitude = (value: string) => {
        setCreateEntity({
            ...createEntity,
            coordinates: [value, createEntity.coordinates[1]]
        });
    }

    const handleChangesLatitud = (value: string) => {
        setCreateEntity({
            ...createEntity,
            coordinates: [createEntity.coordinates[0], value]
        });
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const result = await entitiesService.createEntity(createEntity);

            if (result.status === 201) {
                props.handleUserCreated();
            } else {
                Swal.fire({
                    title: 'Oops...',
                    text: 'La entidad ya existe. Pruebe con otro email.',
                    icon: 'warning'
                })
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
            onHide={() => props.handleClose(false)}
            size="lg"
            animation={false}
            centered={true}
            onEscapeKeyDown={() => props.handleClose(false)}
            onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Crear Entidad</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNameLastname">
                        <Form.Label>Nombre Entidad</Form.Label>
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Ingrese el nombre de la entidad"
                            required
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
                            required
                            onChange={e => handleChangesLegalNumber(e.target.value)}
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
                            required
                            onChange={e => handleChangesEmail(e.target.value)}
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
                            onChange={e => handleChangesRisk(e.target.value)}
                        />

                        <Form.Check
                            type="checkbox"
                            id="inundación"
                            value="inundación"
                            label="Inundación"
                            onChange={e => handleChangesRisk(e.target.value)}
                        />

                        <Form.Check
                            type="checkbox"
                            id="accidente"
                            value="accidente"
                            label="Accidente"
                            onChange={e => handleChangesRisk(e.target.value)}
                        />

                        <Form.Check
                            type="checkbox"
                            id="amenaza climática"
                            value="amenaza climática"
                            label="Amenaza climática"
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
                            onChange={e => handleChangesLatitud(e.target.value)}
                        />
                    </Form.Group>

                    <br />

                    <Button variant="primary" type="submit">
                        Crear
                    </Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateEntityModal;