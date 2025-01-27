import type {
  SelectChangeEvent
} from '@mui/material';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import {
  Box, Button,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

import { createTask } from 'src/helpers/api/api';
import { DashboardContent } from 'src/layouts/dashboard';

import validate from './validation';

import type { IFormValues } from './validation';

export const CreateTaskView = () => {
  const initialValues: IFormValues = {
    name: '',
    description: ''
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});

  // HANDLE TASK CREATION
  const handleTaskCreation = async () => {
    setLoading(true);
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const payLoad = {
        name: values.name,
        description: values.description
      };

      const newTask = await createTask(payLoad);

      console.log(newTask)
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    // Reset errors
    setErrors({});
  };


  // HANDLE CANCEL BUTTON
  const handleCancel = () => {
    navigate('/tasks');
  };

  // RENDER TASK CREATION FORM
  const renderForm = (
    <Box component="form" sx={{ mt: 2 }}>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={values.name}
          onChange={handleChange}
          autoComplete="off"
          error={errors.name}
          helperText={errors.name ?? errors.name}
        />
      </Box>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          name="description"
          value={values.description}
          onChange={handleChange}
          error={!!errors?.description}
          helperText={errors?.description ?? errors?.description}
        />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          size="large"
          type="button"
          color="inherit"
          variant="contained"
          sx={{ mt: 2, mr: 1 }}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <LoadingButton
          size="large"
          type="button"
          color="inherit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          onClick={handleTaskCreation}
        >
          {loading ? <CircularProgress size="1rem" /> : 'Submit'}
        </LoadingButton>
      </Box>
    </Box>
  );

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" flexGrow={1}>
          Add New Task
        </Typography>
      </Box>

      {renderForm}
    </DashboardContent>
  );
};
