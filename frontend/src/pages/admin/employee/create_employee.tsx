import { AuthProvider } from '../../../hooks/authentication';
import { Form } from "@unform/web";
import FlexBox from '../../../components/flex_box';
import { FormLabel, Col, Row, Button } from 'react-bootstrap';
import { SubmitHandler, FormHandles } from '@unform/core';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/toast';
import * as Yup from 'yup';
import BasicInput from '../../../components/form/basic_input';
import { api } from '../../../services/axios';
import { extractValidationErrors } from '../../../utils/validation_errors';
import { AxiosError } from "axios";
import './employee.css'

const EmployeeCreation: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const { presentToast } = useToast();

    const handleCreation: SubmitHandler = async (data) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                first_name: Yup.string().required('Nome do funcionário é obrigatório'),
                last_name: Yup.string().required('Sobrenome do funcionário é obrigatório'),
                email: Yup.string().required('Email do funcionário é obrigatório').email('Digite um email válido'),
                phone: Yup.string().optional().nullable(),
                department_id: Yup.string().required('Digite o código do departamento'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/employees', data);

            presentToast({
                title: 'Funcionário criado com sucesso!',
                description: 'O funcionário foi criado com sucesso!',
                style: 'success'
            });

            navigate('/admin/employee');


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
                    return;
                }
                if (error.response?.status === 402) {
                    presentToast({
                        title: 'Aviso!',
                        style: 'warning',
                        description: "O email informado já está cadastrado"
                    });
                    return;
                }
            }



        }

    }

    return (
        <AuthProvider>
            <div className="App d-flex flex-column" >
                <h1>Cadastro de Funcionário</h1>

                <div className='flex-grow-1'>
                    <Form ref={formRef} onSubmit={handleCreation} className='h-100 w-100 ' >
                        <FlexBox>
                            <FormLabel>Nome</FormLabel>
                            <BasicInput name='first_name' placeholder='Nome' />
                        </FlexBox>

                        <FlexBox>
                            <FormLabel>Sobrenome</FormLabel>
                            <BasicInput name='last_name' placeholder='Sobrenome' />
                        </FlexBox>

                        <FlexBox>

                            <FormLabel>Email</FormLabel>
                            <BasicInput name='email' placeholder='Email' />
                        </FlexBox>

                        <FlexBox>
                            <FormLabel>Telefone</FormLabel>
                            <BasicInput name='phone' placeholder='Telefone (opcional)' />
                        </FlexBox>

                        <FlexBox>
                            <FormLabel>Departamento</FormLabel>
                            <BasicInput name='department_id' placeholder='Código do departamento' />
                        </FlexBox>

                        <Row>
                            <Col>
                                <Button variant='primary' type='submit'>Criar</Button>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </div>
        </AuthProvider>
    );

}
export default EmployeeCreation;