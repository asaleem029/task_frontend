export interface IFormValues {
    name: string;
    slug: string;
    hasModificationAccess: boolean;
    accessLevel: number;
    isActive: boolean;
    isManagerial: boolean;
    description: string;
}

export interface IFormErrors {
    name?: string;
    slug?: string;
    hasModificationAccess?: string;
    accessLevel?: string;
    isActive?: string;
    isManagerial?: string;
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
    else if (values.accessLevel === 0) {
        errors.accessLevel = "Access Level must be greater than 0";
    }
    else if (values.accessLevel > 50000) {
        errors.accessLevel = "Access Level must be less than or equals to 50000";
    }

    return errors;
};

export default validate;
