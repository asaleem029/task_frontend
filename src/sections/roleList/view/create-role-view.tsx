import type {
  SelectChangeEvent
} from '@mui/material';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Box , Button ,
  Checkbox,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import { createRole } from 'src/helpers/api/api';
import { DashboardContent } from 'src/layouts/dashboard';

import validate from './validation';

import type { IFormValues } from './validation';

export const CreateRoleView = () => {
  const initialValues: IFormValues = {
    name: '',
    slug: '',
    accessLevel: 0,
    isActive: false,
    hasModificationAccess: false,
    isManagerial: false,
    description: ''
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});

  // HANDLE ROLE CREATION
  const handleRoleCreation = async () => {
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
        slug: values.slug,
        accessLevel: values.accessLevel,
        hasModificationAccess: values.hasModificationAccess,
        isActive: values.isActive,
        isManagerial: values.isManagerial,
        description: values.description !== '' ? values.description : null
      };

      const newRole = await createRole(payLoad);

      if (newRole.success) {
        toast.success(newRole.userMessage);
        setValues(initialValues);
        navigate('/roles');
      } else {
        toast.error(newRole.userMessage || 'An error occurred while creating the plan.');
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValues((prevValues: any) => {
      const updatedValues = { ...prevValues, [name]: value };

      // Handle specific cases
      if (name === 'hasModificationAccess') {
        updatedValues.hasModificationAccess = !prevValues.hasModificationAccess;
      }
      else if (name === 'isActive') {
        updatedValues.isActive = !prevValues.isActive;
      }
      else if (name === 'isManagerial') {
        updatedValues.isManagerial = !prevValues.isManagerial;
      }
      else if (name === 'accessLevel') {
        const cleanedValue = value.replace(/[^0-9.]/g, ''); // Remove all non-numeric characters except for '.'
        updatedValues.accessLevel = cleanedValue ? Number(cleanedValue) : 0;
      }
      else if (name === 'name') {
        updatedValues.slug = value.toUpperCase().replace(/ /g, "_");
      }

      return updatedValues;
    });

    // Reset errors
    setErrors({});
  };


  // HANDLE CANCEL BUTTON
  const handleCancel = () => {
    navigate('/roles');
  };

  // RENDER PLAN TYPE CREATION FORM
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

        <TextField
          label="Slug"
          variant="outlined"
          fullWidth
          name="slug"
          value={values.slug}
          autoComplete="off"
          disabled
        />

        <TextField
          label="Access Level"
          variant="outlined"
          fullWidth
          name="accessLevel"
          type='number'
          value={values.accessLevel}
          onChange={handleChange}
          autoComplete="off"
          error={errors.accessLevel}
          helperText={errors.accessLevel ?? errors.accessLevel}
        />
      </Box>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <FormControl fullWidth>
          <FormControlLabel
            control={<Checkbox name="hasModificationAccess" onChange={handleChange} />}
            label={<span style={{ fontWeight: 'bold' }}>Has Modification Access</span>}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormControlLabel
            control={<Checkbox name="isActive" onChange={handleChange} />}
            label={<span style={{ fontWeight: 'bold' }}>Is-Active</span>}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormControlLabel
            control={<Checkbox name="isManagerial" onChange={handleChange} />}
            label={<span style={{ fontWeight: 'bold' }}>Is-Managerial</span>}
          />
        </FormControl>
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
          onClick={handleRoleCreation}
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
          Add New Role
        </Typography>
      </Box>

      {renderForm}
    </DashboardContent>
  );
};
