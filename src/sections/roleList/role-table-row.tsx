import type {
  SelectChangeEvent
} from '@mui/material';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  TableRow,
  Checkbox,
  TableCell
  , TextField, CircularProgress
} from '@mui/material';

import { createRole, updateRole } from 'src/helpers/api/api';

import validate from "./view/validation";

import type { IFormValues } from "./view/validation";

export type RoleProps = {
  id: string;
  name: string;
  slug: string;
  accessLevel: number;
  description: string;
  isActive: string;
  isManagerial: boolean;
  hasModificationAccess: boolean;
  createdAt: string;
};

type RoleTableRowProps = {
  row: RoleProps;
  index: number;
  page: number;
  rowsPerPage: number;
  handleCancel: any;
  fetchRoles: any;
  addNewRow: any;
};

const initialValues: IFormValues = {
  name: '',
  slug: '',
  accessLevel: 0,
  isActive: false,
  hasModificationAccess: false,
  isManagerial: false,
  description: ''
};

export const RoleTableRow = ({ row, index, page, rowsPerPage, handleCancel, fetchRoles, addNewRow }: RoleTableRowProps) => {
  const rowIndex = index + 1;
  const rowId = rowIndex + page * rowsPerPage;
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

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
        fetchRoles(0)
        setValues(initialValues);
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

  const handleEdit = () => {
    setIsEditing(true)
    setValues(
      {
        name: row.name,
        slug: row.slug,
        accessLevel: row.accessLevel,
        isActive: row.isActive,
        hasModificationAccess: row.hasModificationAccess,
        isManagerial: row.isManagerial,
        description: row.description
      }
    )
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setValues(initialValues)
  }

  const handleRoleUpdation = async (id: number) => {
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

      const roleUpdate = await updateRole(id, payLoad);

      if (roleUpdate.success) {
        toast.success(roleUpdate.userMessage);
        setIsEditing(false)
        setValues(initialValues);
        fetchRoles(0)
      } else {
        toast.error(roleUpdate.userMessage || 'An error occurred while creating the plan.');
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row">
        {rowId}
      </TableCell>

      <TableCell component="th" scope="row">
        {(!row.id && addNewRow) || (row.id && isEditing) ? (
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={values.name}
            onChange={handleChange}
            autoComplete="off"
            error={errors.name}
            helperText={errors.name}
          />
        ) : (
          row.name
        )}
      </TableCell>

      <TableCell component="th" scope="row">
        {(!row.id && addNewRow) || (row.id && isEditing) ? (
          <TextField
            label="Slug"
            variant="outlined"
            fullWidth
            name="slug"
            value={values.slug}
            autoComplete="off"
            disabled
          />
        ) : (
          row.slug
        )}
      </TableCell>

      <TableCell component="th" scope="row">
        {(!row.id && addNewRow) || (row.id && isEditing) ? (
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
        ) : (
          row.accessLevel
        )}
      </TableCell>

      <TableCell component="th" scope="row">
        {(!row.id && addNewRow) || (row.id && isEditing) ? (
          <Checkbox name="isActive" checked={values.isActive} onChange={handleChange} />
        ) : row.id && row.isActive ? (
          'Yes'
        ) : (
          'No'
        )}
      </TableCell>

      <TableCell component="th" scope="row">
        {(!row.id && addNewRow) || (row.id && isEditing) ? (
          <Checkbox name="isManagerial" checked={values.isManagerial} onChange={handleChange} />
        ) : row.id && row.isManagerial ? (
          'Yes'
        ) : (
          'No'
        )}
      </TableCell>

      <TableCell component="th" scope="row">
        {(!row.id && addNewRow) || (row.id && isEditing) ? (
          <Checkbox name="hasModificationAccess" checked={values.hasModificationAccess} onChange={handleChange} />
        ) : row.id && row.hasModificationAccess ? (
          'Yes'
        ) : (
          'No'
        )}
      </TableCell>

      <TableCell component="th" scope="row">
        {(!row.id && addNewRow) || (row.id && isEditing) ? (
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={values.description}
            onChange={handleChange}
            autoComplete="off"
          />
        ) : (
          row.description
        )}
      </TableCell>

      <TableCell>
        {!row.id && addNewRow ?
          (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                size="small"
                type="button"
                color="inherit"
                variant="contained"
                sx={{ mt: 2, mr: 1 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>

              <LoadingButton
                size="small"
                type="button"
                color="inherit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={loading}
                onClick={handleRoleCreation}
              >
                {loading ? <CircularProgress size="1rem" /> : 'Save'}
              </LoadingButton>
            </Box>
          )
          :
          row.id && isEditing ?
            (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  size="small"
                  type="button"
                  color="inherit"
                  variant="contained"
                  sx={{ mt: 2, mr: 1 }}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>

                <LoadingButton
                  size="small"
                  type="button"
                  color="inherit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  disabled={loading}
                  onClick={() => handleRoleUpdation(Number(row.id))}
                >
                  {loading ? <CircularProgress size="1rem" /> : 'Update'}
                </LoadingButton>
              </Box>
            )
            :
            (
              <LoadingButton
                size="small"
                type="button"
                color="inherit"
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleEdit}
              >
                Edit
              </LoadingButton>
            )
        }
      </TableCell>
    </TableRow>
  );
};
