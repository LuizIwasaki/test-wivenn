import { FormHandles, SubmitHandler } from '@unform/core';
import { useAuth } from "../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Form } from "@unform/web";
import BasicInput from "../components/form/basic_input";
import FlexBox from "../components/flex_box"
import { Button, FormLabel } from "react-bootstrap";
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { extractValidationErrors } from '../utils/validation_errors';
import { useToast } from '../hooks/toast';

import './login.css';
interface ILoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { presentToast } = useToast();

  const handleLogin: SubmitHandler<ILoginFormData> = async (data) => {

    try {

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      await login(data.email, data.password);

      navigate('/home');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(extractValidationErrors(error));
        return;
      }
      if (error instanceof AxiosError) {
        presentToast({
          title: 'Erro',
          style: 'danger',
          description: 'Email e/ou Senha incorreto(s)'
        });
      }
    }
  }

  return (
    <FlexBox className="d-flex justify-content-center align-items-center" style={{ backgroundSize: 'cover' }}>
      <div className="login-container">

        <Form onSubmit={handleLogin} ref={formRef} className="form-box">
          <div className="form-field">
            <FormLabel className="form-label">Email</FormLabel>
            <BasicInput name="email" type="email" className="form-input" />
          </div>

          <div className="form-field">
            <FormLabel className="form-label">Senha</FormLabel>
            <BasicInput name="password" type="password" className="form-input" />
          </div>

          <Button type="submit" className="form-submit">Entrar</Button>

        </Form>
      </div>
    </FlexBox>
  );
};

export default LoginPage;