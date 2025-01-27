export interface IFormValues {
    firstName: string,
    lastName: string
    email: string,
    password: string,
    confirmPassword: string
}

export interface IFormErrors {
    firstName?: string,
    lastName?: string
    email?: string,
    password?: string,
    confirmPassword?: string
}

const validate = (values: IFormValues): IFormErrors => {
    const errors: IFormErrors = {};

    if (!values.firstName) {
        errors.firstName = `First Name id required.`
    }
    else if (!values.lastName) {
        errors.lastName = "Last Name is required.";
    }
    else if (!values.email) {
        errors.email = "Email is required.";
    }
    else if (!values.password) {
        errors.password = "Password is required.";
    }
    else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }
    else if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required.";
    }
    else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
};

export default validate;
