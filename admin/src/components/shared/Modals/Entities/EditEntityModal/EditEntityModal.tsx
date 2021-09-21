import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { IEditEntity, IEditEntityDTO } from '../../../../../core/interfaces/IEntities';
import EntitiesService from '../../../../../core/services/EntitiesService';
import { logOutAction } from '../../../../store/user/user.slice';
import { EditEntityModalProps } from './types';

const EditEntityModal = (props: EditEntityModalProps) => {
    const entitiesService: EntitiesService = new EntitiesService();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const entityType = [
        "Educación",
        "Centro salud",
        "Depósito combustible",
        "Organismo público",
        "Lugar evento masivo",
        "Club",
        "Hogar acogida"
    ];

    const sectorType = [
        "Privada",
        "Estatal",
        "Público"
    ];

    const validationSchema = yup.object().shape({
        name: yup.string().required("Requerido"),
        entityType: yup.string().required("Requerido"),
        legalNumber: yup.string().required('Required'),
        address: yup.string().required('Required'),
        phone: yup.string().required('Required'),
        postalCode: yup.string().required('Required'),
        email: yup.string().required("Requerido").email("Ingrese un email válido"),
        sector: yup.string().required('Required'),
        longitude: yup.string().required("Requerido"),
        latitude: yup.string().required("Requerido")
    });

    const searchRisk = (value: string): boolean => {
        return props.entity.risk.indexOf(value) !== -1;
    }

    const handleSubmit = async (values: any) => {
        setLoading(true);
        console.log(values);

        if (values.accidente) {
            if (searchRisk('accidente')) {
                values.risk = values.risk.filter((v: string) => v !== 'accidente');
            } else {
                values.risk.push('accidente');
            }
        }

        if (values.incendio) {
            if (searchRisk('incendio')) {
                values.risk = values.risk.filter((v: string) => v !== 'incendio');
            } else {
                values.risk.push('incendio');
            }
        }

        if (values.inundación) {
            if (searchRisk('inundación')) {
                values.risk = values.risk.filter((v: string) => v !== 'inundación');
            } else {
                values.risk.push('inundación');
            }
        }

        if (values.amenaza_climática) {
            if (searchRisk('amenaza climática')) {
                values.risk = values.risk.filter((v: string) => v !== 'amenaza climática');
            } else {
                values.risk.push('amenaza climática');
            }
        }

        try {
            const entityEdited: IEditEntity = {
                name: values.name,
                entityType: values.entityType,
                address: values.address,
                phone: values.phone,
                postalCode: values.postalCode,
                sector: values.sector,
                risk: values.risk,
                coordinates: [values.longitude, values.latitude]
            }
            console.log('New values', entityEdited);
            const result = await entitiesService.editEntity(props.entity._id, entityEdited);
            console.log(result);

            setLoading(false);

            props.handleEntityEdited();
        } catch (e) {
            console.log("ERROR", e);

            setLoading(false);

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
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'Intente nuevamente',
                    icon: 'error'
                });
            }
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
        >
            <Modal.Header closeButton>
                <Modal.Title>Editar Entidad</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={props.entity}
                    validationSchema={validationSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);

                        handleSubmit(data);

                        setSubmitting(false);
                    }}
                >
                    {
                        ({
                            values,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            touched
                        }) => (
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <Form.Group
                                    controlId="name"
                                    className="position-relative"
                                >
                                    <Form.Label>Nombre de la Entidad</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese el nombre de la entidad"
                                        defaultValue={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.name && !errors.name}
                                        isInvalid={!!errors.name}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.name}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="entityType"
                                    className="position-relative"
                                >
                                    <Form.Label>Seleccione el tipo de Entidad</Form.Label>
                                    <Form.Control
                                        as="select"
                                        size="lg"
                                        defaultValue={values.entityType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.entityType && !errors.entityType}
                                        isInvalid={!!errors.entityType}
                                    >
                                        <option value={""}>Selecciona una opción</option>
                                        {
                                            entityType.map((type, index) => {
                                                return <option value={type} key={index}>
                                                    {type}
                                                </option>
                                            })
                                        }
                                    </Form.Control>

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.entityType}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="legalNumber"
                                    className="position-relative"
                                >
                                    <Form.Label>Número Legal</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese el número legal"
                                        defaultValue={values.legalNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.legalNumber && !errors.legalNumber}
                                        isInvalid={!!errors.legalNumber}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.legalNumber}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="address"
                                    className="position-relative"
                                >
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese el dirección"
                                        defaultValue={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.address && !errors.address}
                                        isInvalid={!!errors.address}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.address}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="phone"
                                    className="position-relative"
                                >
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese el teléfono"
                                        defaultValue={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.phone && !errors.phone}
                                        isInvalid={!!errors.phone}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.phone}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="postalCode"
                                    className="position-relative"
                                >
                                    <Form.Label>Código Postal</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese el código postal"
                                        defaultValue={values.postalCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.postalCode && !errors.postalCode}
                                        isInvalid={!!errors.postalCode}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.postalCode}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="email"
                                    className="position-relative"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="email"
                                        placeholder="Ingrese el email"
                                        defaultValue={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.email}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="sector"
                                    className="position-relative"
                                >
                                    <Form.Label>Seleccione el Sector</Form.Label>
                                    <Form.Control
                                        as="select"
                                        size="lg"
                                        defaultValue={values.sector}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.sector && !errors.sector}
                                        isInvalid={!!errors.sector}
                                    >
                                        <option value={""}>Selecciona una opción</option>
                                        {
                                            sectorType.map((type, index) => {
                                                return <option value={type} key={index}>
                                                    {type}
                                                </option>
                                            })
                                        }
                                    </Form.Control>

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.sector}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="risk"
                                    className="position-relative"
                                >
                                    <Form.Label>Riesgo</Form.Label>

                                    <Form.Check
                                        type="checkbox"
                                        id="incendio"
                                        value="incendio"
                                        label="Incendio"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.risk && !errors.risk}
                                        isInvalid={!!errors.risk}
                                        defaultChecked={searchRisk('incendio')}
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        id="inundación"
                                        value="inundación"
                                        label="Inundación"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.risk && !errors.risk}
                                        isInvalid={!!errors.risk}
                                        defaultChecked={searchRisk('inundación')}
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        id="accidente"
                                        value="accidente"
                                        label="Accidente"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.risk && !errors.risk}
                                        isInvalid={!!errors.risk}
                                        defaultChecked={searchRisk('accidente')}
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        id="amenaza_climática"
                                        value="amenaza climática"
                                        label="Amenaza climática"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.risk && !errors.risk}
                                        isInvalid={!!errors.risk}
                                        defaultChecked={searchRisk('amenaza climática')}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.risk}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group controlId="formCoordinates">
                                    <Form.Label>Coordenadas</Form.Label>
                                </Form.Group>

                                <Form.Group
                                    controlId="longitude"
                                    className="position-relative"
                                >
                                    <Form.Label>Longitud</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese la longitud"
                                        defaultValue={values.longitude}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.longitude && !errors.longitude}
                                        isInvalid={!!errors.longitude}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.longitude}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Form.Group
                                    controlId="latitude"
                                    className="position-relative"
                                >
                                    <Form.Label>Latitud</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ingrese la latitud"
                                        defaultValue={values.latitude}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.latitude && !errors.latitude}
                                        isInvalid={!!errors.latitude}
                                    />

                                    <Form.Control.Feedback
                                        type="invalid"
                                        tooltip
                                    >{errors.latitude}</Form.Control.Feedback>
                                </Form.Group>

                                <br />

                                <Button
                                    variant="primary"
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    Guardar
                                </Button>
                            </Form>
                        )
                    }
                </Formik>

                {
                    loading &&
                    <div className="spinner-container">
                        <Spinner animation="border" role="status">
                        </Spinner>
                    </div>
                }
            </Modal.Body>
        </Modal>
    );
}

export default EditEntityModal;