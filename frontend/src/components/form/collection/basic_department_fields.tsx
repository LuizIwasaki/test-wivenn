import { Col, FormLabel, Row } from "react-bootstrap";
import BasicInput from "../basic_input";


const BasicDepartmentFields: React.FC = () => {


    return (
        <fieldset className="form-group border p-3">
            <legend>Departamento</legend>
            <Row className="g-2" style={{marginTop:'10px'}}>
                <Col>
                    <FormLabel>Nome do departamento</FormLabel>
                    <BasicInput name="nome" />
                </Col>
            </Row>
            <Row className="g-1" style={{marginTop:'10px'}}>
                <Col>
                    <FormLabel>E-mail</FormLabel>
                    <BasicInput name="email" type="email" placeholder="(Opcional)"/>
                </Col>
            </Row>
        </fieldset>
    )
};

export default BasicDepartmentFields;