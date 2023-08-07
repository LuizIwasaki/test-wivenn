import { AuthProvider } from '../../../hooks/authentication';
import { Form } from "@unform/web";
import FlexBox from '../../../components/flex_box';
import { FormLabel, Button, Row } from 'react-bootstrap';
import { SubmitHandler, FormHandles } from '@unform/core';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from '../../../hooks/toast';
import * as Yup from 'yup';
import BasicInput from '../../../components/form/basic_input';
import { api } from '../../../services/axios';
import "./department.css";
import { extractValidationErrors } from '../../../utils/validation_errors';
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ItemFilter from "../../../components/item_filter";
import { FaApper, FaClock, FaPen, FaRegDotCircle, FaTrash } from 'react-icons/fa';

export interface Department {
    id: number;
    name: string;
}

const EditDepartmentPage: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const { presentToast } = useToast();


    useEffect(() => {
        api.get(`/departments/${id}`).then(res => {


            const data = res.data.department as Department;

            console.log(data);
            formRef.current?.setData({

                name: data.name,
            });
        }).catch(error => {
            console.log(error);
        });
    },[]);

    const handleEdit: SubmitHandler = async (data) => {


        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required(),
            });

            await schema.validate(data, { abortEarly: false });

            await api.put(`/departments/${id}`, data);

            presentToast({
                title: 'Sucesso',
                style: 'success',
                description: 'Departamento editado com sucesso'
            });

            navigate('/admin/department');

        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(extractValidationErrors(error));
                return;
            }

            if (error instanceof AxiosError) {
                presentToast({
                    title: 'Erro',
                    style: 'danger',
                    description: 'Erro ao editar departamento'
                });

                return;
            }
        }
    }
    
        return (
        <FlexBox className="d-flex justify-content-center align-items-center" style={{ backgroundSize: 'cover' }}>
            <div >

                <Form onSubmit={handleEdit} ref={formRef} className="form-box">
                    <div className="form-field">
                        <FormLabel className="form-label">Nome do departamento</FormLabel>
                        <BasicInput name="name" type="text" className="form-input" />
                    </div>

                    <div className="form-button-container">
                        <Button type="submit" variant="primary" className="form-button">Salvar Alteração</Button>
                    </div>
                    <div className="form-button-container">
                        <Link to="/admin/department" className="form-button">Voltar</Link>
                    </div>
                </Form>
            </div>
        </FlexBox>
    );
}

export default EditDepartmentPage;