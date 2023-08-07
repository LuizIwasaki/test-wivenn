import { AuthProvider } from '../../../hooks/authentication';
import { Form } from "@unform/web";
import FlexBox from '../../../components/flex_box';
import { FormLabel, Button } from 'react-bootstrap';
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

const DepartmentCreation: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const { presentToast } = useToast();

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
            console.log('teste');
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
                        description: error.response.data.error
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
        </AuthProvider>

    )

};

export default DepartmentCreation;