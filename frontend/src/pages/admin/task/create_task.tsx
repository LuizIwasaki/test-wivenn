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
import { extractValidationErrors } from '../../../utils/validation_errors';
import { AxiosError } from "axios";

const TaskCreation: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const { presentToast } = useToast();

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

                <div className="App d-flex flex-column" >

                    <h1>Cadastro de Tarefa</h1>

                    <div className='flex-grow-1'>
                    </div>
                </div>
            </AuthProvider>
        );

}
export default TaskCreation;