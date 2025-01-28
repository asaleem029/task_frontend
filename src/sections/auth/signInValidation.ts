export interface IFormValues {
    email: string,
    password: string
}

export interface IFormErrors {
    email?: string,
    password?: string,
}

const validate = (values: IFormValues): IFormErrors => {
    const errors: IFormErrors = {};

    if (!values.email) {
        errors.email = "Email is required.";
    }
    else if (!values.password) {
        errors.password = "Password is required.";
    }

    return errors;
};

export default validate;
