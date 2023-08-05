import { FormHandles, SubmitHandler } from '@unform/core';
import { useAuth } from "../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Form } from "@unform/web";
import BasicInput from "../components/form/basic_input";
import FlexBox from "../components/flex_box"
import { Button, FormLabel } from "react-bootstrap";
import * as Yup from 'yup';
import { useToast } from "../hooks/toast";
import { extractValidationErrors } from "../utils/validation_errors";

import { AxiosError } from 'axios';
interface ILoginFormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin: SubmitHandler<ILoginFormData> = async (data) => {

        try {
            console.log('before_handleLogin');
            formRef.current?.setErrors({});
            console.log('after_handleLogin');
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().required(),
            });

            console.log('before_validate');
            await schema.validate(data, {
                abortEarly: false,
            });
            await login(data.email, data.password);

            navigate('/home');

        } catch (error) {
            console.log('Error:', error);
            if (error instanceof Yup.ValidationError) {
              console.log('validation_error');
              console.log(error);
            }
          }

    }

    return (
        <FlexBox className="d-flex justify-content-center align-items-center" style={{ backgroundSize: 'cover' }}>
            <div style={{ backgroundColor: "gray", padding: '28px', borderRadius: '20px', fontFamily: 'Arial', fontSize: '20px', color: 'white', width: '23vw' }}>

                <Form onSubmit={handleLogin} ref={formRef} className="d-flex flex-column">
                    <FormLabel>Email</FormLabel>
                    <BasicInput name="email" type="email" />

                    <FormLabel style={{ marginTop: '20px' }}>Senha</FormLabel>
                    <BasicInput name="password" type="password" placeholder='Senha' />

                    <Button type="submit" className="float-end" style={{ marginTop: '20px' }}>Entrar</Button>

                </Form>
            </div>
        </FlexBox>
    );
};

export default LoginPage;