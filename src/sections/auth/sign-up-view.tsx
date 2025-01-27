import { useState } from 'react';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

import validate from './validation';

import type { IFormValues } from './validation';

// INITIAL VALUES
const initialValues: IFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [values, setValues] = useState<any>(initialValues);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // HANDLE ON CHANGE EVENT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // SET VALUES
    setValues({
      ...values,
      [name]: value,
    });

    // Reset errors
    setErrors({});
  };

  // HANDLE ON SUBMIT EVENT
  const handleSignUp = async () => {
    setLoading(true); // Set loading state to true
    const validationErrors = validate(values); // Validate form values

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // PAYLOAD
      const payLoad = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      console.log(payLoad)

    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false
    }
  }

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="firstName"
        label="First Name"
        value={values.firstName}
        onChange={handleChange}
        sx={{ mb: 3 }}
        error={errors.firstName}
        helperText={errors.firstName}
      />

      <TextField
        fullWidth
        name="lastName"
        label="Last Name"
        value={values.lastName}
        onChange={handleChange}
        sx={{ mb: 3 }}
        error={errors.lastName}
        helperText={errors.lastName}
      />

      <TextField
        fullWidth
        name="email"
        label="email"
        value={values.email}
        onChange={handleChange}
        sx={{ mb: 3 }}
        error={errors.email}
        helperText={errors.email}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={values.password}
        onChange={handleChange}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
        error={errors.password}
        helperText={errors.password}
      />
      <TextField
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        value={values.confirmPassword}
        onChange={handleChange}
        type={showConfirmPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                <Iconify icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
        error={errors.confirmPassword}
        helperText={errors.confirmPassword}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignUp}
        loading={!!loading}
      >
        Sign Up
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign Up</Typography>
      </Box>

      {renderForm}
    </>
  );
}
