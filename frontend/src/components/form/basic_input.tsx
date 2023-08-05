import { useField } from "@unform/core";
import { useEffect, useRef } from "react"
import { FormControl, FormControlProps, FormText } from "react-bootstrap";

interface IInputFields {
    name: string;
    step?: number;
}

const BasicInput: React.FC<FormControlProps & IInputFields> = ({ name, ...rest }) => {

    const normalInputRef = useRef<HTMLInputElement>(null);
    const { fieldName, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: normalInputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField]);

    return (
        <>
            <FormControl name={name} ref={normalInputRef} className={error ? 'is-invalid' : undefined} {...rest} />
            { error ? <FormText className="text-danger">{error}</FormText> : undefined }
        </>
    );
}
export default BasicInput