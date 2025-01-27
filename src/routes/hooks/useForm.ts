import type { SelectChangeEvent } from "@mui/material";

import { useState } from "react";

export function useForm(initialValues: any, validate: (values: any) => any, onSubmit: (values: any) => void) {
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrors({});
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      setValues(initialValues);
    }
  };

  return { handleChange, handleSubmit, values, errors };
};

