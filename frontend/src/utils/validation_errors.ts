import * as Yup from 'yup';

interface Errors {
    [key: string]: string;
}

const extractValidationErrors = (err: Yup.ValidationError): Errors => {
    const validationError: Errors = {};

    err.inner.forEach(error => {
        validationError[(error.path as string).split('.')[0]] = error.message;
    });

    return validationError;
}

export {
    extractValidationErrors
}