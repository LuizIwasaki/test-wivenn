import { AuthProvider } from '../../../hooks/authentication';
import { Form } from "@unform/web";
import FlexBox from '../../../components/flex_box';
import { FormLabel, Button, Row } from 'react-bootstrap';
import { SubmitHandler, FormHandles } from '@unform/core';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/toast';
import * as Yup from 'yup';
import BasicInput from '../../../components/form/basic_input';
import { api } from '../../../services/axios';
import { extractValidationErrors } from '../../../utils/validation_errors';
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ItemFilter from "../../../components/item_filter";
import { FaApper, FaClock, FaPen, FaRegDotCircle, FaTrash } from 'react-icons/fa';
import "../../../index.css";


interface Task {
    id: string;
    title: string;
    description: string;
    assigned: string;
    due_date: string;
}


const TaskCreation: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const { presentToast } = useToast();
    const [departments, setDepartments] = useState<Task[]>([]);
    const [filteredDepartments, setFilteredDepartments] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const handleCreation: SubmitHandler = async (data) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                title: Yup.string().required('Nome da tarefa é obrigatório'),
                description: Yup.string().optional(),
                assigned: Yup.string().required('O código do funcionário é obrigatório'),
                due_date: Yup.string().optional()

            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/tasks', data);

            presentToast({
                title: 'Tarefa criada com sucesso!',
                description: 'A tarefa foi criada com sucesso!',
                style: 'success'
            });

            navigate('/admin/task');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                console.log(error.errors);
                formRef.current?.setErrors(extractValidationErrors(error));
                presentToast({
                    title: 'Aviso!',
                    description: 'Verifique se os campos estão preenchidos corretamente.',
                    style: 'warning'
                });
                return;
            }
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    presentToast({
                        title: 'Aviso!',
                        style: 'warning',
                        description: error.response.data.error
                    });
                }
                if (error.response?.status === 402) {
                    presentToast({
                        title: 'Aviso!',
                        style: 'warning',
                        description: "A tarefa já está cadastrada"
                    });
                    return;
                }
            }


        }

    }
    return (

        <AuthProvider>
            <Form onSubmit={handleCreation} ref={formRef} className='h-100 w-100 '>
                <h1>Cadastro de tarefa</h1>
                <FlexBox vertical fullDimensions>
                    <div >
                        <div className="form-col">
                            <FormLabel>Titulo da Tarefa</FormLabel>
                            <BasicInput name="name" placeholder="Titulo" className="form-input" />
                        </div>

                        <div className="form-col">
                            <FormLabel>Descrição da Tarefa</FormLabel>
                            <BasicInput name="description" placeholder="Descrição" className="form-input" />
                        </div>

                        <div className="form-col">
                            <FormLabel>Funcionário</FormLabel>
                            <BasicInput name="assigned" placeholder="Funcionário" className="form-input" />
                        </div>

                        <div className="form-col">
                            <FormLabel>Data de entrega (Opcional)</FormLabel>
                            <BasicInput name="due_date" placeholder="Data de entrega" className="form-input" type="date" />
                        </div>
                            
                        <div className="form-button-container">
                            <Button type="submit" variant="primary" className="form-button">Cadastrar</Button>
                        </div>
                    </div>
                </FlexBox>
            </Form>

        </AuthProvider>


    );

}
export default TaskCreation;