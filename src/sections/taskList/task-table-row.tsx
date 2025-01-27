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

import { createTask, updateTask } from 'src/helpers/api/api';

import validate from "./view/validation";

import type { IFormValues } from "./view/validation";

export type TaskProps = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
};

type TaskTableRowProps = {
  row: TaskProps;
  index: number;
  page: number;
  rowsPerPage: number;
  handleCancel: any;
  fetchTasks: any;
  addNewRow: any;
};

const initialValues: IFormValues = {
  name: '',
  description: ''
};

export const TaskTableRow = ({ row, index, page, rowsPerPage, handleCancel, fetchTasks, addNewRow }: TaskTableRowProps) => {
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

    setValues({
      ...values,
      [name]: value,
    });

    // Reset errors
    setErrors({});
  };

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

  const handleEdit = () => {
    setIsEditing(true)
    setValues(
      {
        name: row.name,
        description: row.description
      }
    )
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setValues(initialValues)
  }

  const handleTaskUpdation = async (id: number) => {
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

      const taskUpdate = await updateTask(id, payLoad);

      console.log(taskUpdate)
    } catch (error) {
      console.error('Error updating task:', error);
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
                onClick={handleTaskCreation}
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
                  onClick={() => handleTaskUpdation(Number(row.id))}
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
