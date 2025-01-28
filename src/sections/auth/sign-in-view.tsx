import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import validate, { IFormErrors, IFormValues } from './signInValidation';
import { signIn } from 'src/helpers/api/api';
import { toast } from 'react-toastify';
import { writeToLocalStorage } from 'src/helpers/ReadAndWriteLocalStorage';

// ----------------------------------------------------------------------

// INITIAL VALUES
const initialValues: IFormValues = {
  email: '',
  password: '',
};

export function SignInView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

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
  const handleSignIn = async () => {
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
        email: values.email,
        password: values.password,
      };

      // CALLING SIGN-UP API
      const response = await signIn(payLoad)
      // SUCCESS REPONSE 
      if (response?.success) {
        toast.success(response.userMessage);
        writeToLocalStorage('token', response?.data?.token); // SAVE TOKEN IN LOCAL STORAGE
        writeToLocalStorage('user', response?.data?.user); // SAVE USER DETAILS IN LOCAL STORAGE
        router.push('/'); // NAVIGATE TO HOME PAGE
        setValues(initialValues); // RESET FORM
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false); // Set loading state to false
    }
  }

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={values.email}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
        error={errors?.email}
        helperText={errors?.email}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={values.password}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
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

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        loading={loading ? true : false}
      >
        Sign in
      </LoadingButton>

      <Typography variant="body2" sx={{ alignSelf: 'center' }}>
        Dont have an account?{' '}
        <Link to='/sign-up' style={{ textDecoration: 'none', color: 'blue' }}>
          Sign up
        </Link>
      </Typography>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
      </Box>

      {renderForm}
    </>
  );
}
