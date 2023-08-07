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


const DepartmentCreation: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const { presentToast } = useToast();
    const [departments, setDepartments] = useState<Department[]>([]);
    const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        featchDepartments();
    }, []);


    const featchDepartments = () => {
        setLoading(true);
        api.get('/departments').then(res => {
            console.log(res.data.departments.length);
            setDepartments(res.data.departments as Department[]);
            setFilteredDepartments(res.data.departments as Department[]);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    }

    const handleCreation: SubmitHandler = async (data) => {


        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome do departamento é obrigatório'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/departments', data);

            presentToast({
                title: 'Departamento criado com sucesso!',
                description: 'O departamento foi criado com sucesso!',
                style: 'success'
            });
            featchDepartments();
            navigate('/admin/department');

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
                        description: "Autenticação inválida, faça login novamente."
                    });
                }
            }
        }


    }


    return (

        <AuthProvider>
            <Form onSubmit={handleCreation} ref={formRef}>
                <h1>Cadastro de departamento</h1>
                <FlexBox vertical fullDimensions>
                    <div className="form-row">
                        <div className="form-col">
                            <FormLabel>Nome do departamento</FormLabel>
                            <BasicInput name="name" placeholder="Nome do departamento" className="form-input" />
                        </div>

                        <div className="form-button-container">
                            <Button type="submit" variant="primary" className="form-button">Cadastrar</Button>
                        </div>
                    </div>
                </FlexBox>
            </Form>

            <>
                <span>{departments.length} departamentos cadastrados</span>

                <ItemFilter originalList={departments} setFilteredList={setFilteredDepartments}
                    filterFields={['name']} placeHolder='Buscar' />

                <Table >
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope='col'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDepartments.map((department, index) => {
                            return (
                                <tr key={index}>
                                    <td>{department.id}</td>
                                    <td>{department.name}</td>

                                    <td>
                                        <div style={{ display: 'inline-flex', gap: '20px' }}>
                                            <FaPen onClick={() => {
                                                navigate(`/admin/department/${department.id}`);
                                            }}>Editar</FaPen>

                                            <FaTrash onClick={() => {
                                                api.delete(`/departments/${department.id}`).then(res => {
                                                    featchDepartments();
                                                }).catch(error => {
                                                    console.log(error);
                                                });
                                            }}>Deletar</FaTrash>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>


            </>
        </AuthProvider>

    )

};

export default DepartmentCreation;