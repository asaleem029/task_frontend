export interface IFormValues {
    name: string;
    description: string;
}

export interface IFormErrors {
    name?: string;
    description?: string;
}

const validate = (values: IFormValues): IFormErrors => {
    const errors: IFormErrors = {};

    if (!values.name) {
        errors.name = `Name id required.`
    }
    else if (values.name.length <= 2) {
        errors.name = "Name should be greater than 1 character";
    }
    else if (values.name.length >= 50) {
        errors.name = "Name should be smaller than 50 character's";
    }
    else if (!values.description) {
        errors.description = "Description is required";
    }

    return errors;
};

export default validate;
