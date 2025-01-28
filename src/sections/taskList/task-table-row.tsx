import type {
  SelectChangeEvent
} from '@mui/material';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import {
  Box, Dialog, Button, TableRow,
  TableCell,
  TextField,
  Typography,
  DialogTitle
  , DialogContent, DialogActions,
  CircularProgress
} from '@mui/material';

import { createTask, deleteTask, updateTask } from 'src/helpers/api/api';
import { readFromLocalStorage } from 'src/helpers/ReadAndWriteLocalStorage';

import validate from "./view/validation";

import type { IFormValues } from "./view/validation";

// TASK PROPS
export type TaskProps = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
};

// TASK TABLE ROW PROPS
type TaskTableRowProps = {
  row: TaskProps;
  index: number;
  page: number;
  rowsPerPage: number;
  handleCancel: any;
  fetchTasks: any;
  addNewRow: any;
};

// INITIAL VALUES
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
  const [open, setOpen] = useState(false);

  // Handle open delete dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Handle close delete dialog
  const handleClose = () => {
    setOpen(false);
  };

  // HANDLE CHANGE
  const handleChange = (
    e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; // DESTRUCTURE NAME AND VALUE

    // SET VALUES
    setValues({
      ...values,
      [name]: value,
    });

    // Reset errors
    setErrors({});
  };

  // HANDLE TASK CREATION
  const handleTaskCreation = async () => {
    setLoading(true); // LOADING
    const validationErrors = validate(values); // VALIDATION

    // VALIDATION
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const user = readFromLocalStorage('user') // READ USER FROM LOCAL STORAGE
      // PAYLOAD
      const payLoad = {
        name: values.name,
        description: values.description,
        userId: user?.id
      };

      // CREATE TASK
      const response = await createTask(payLoad);

      // SUCCESS
      if (response?.success) {
        toast.success(response?.userMessage) // TOAST SUCCESS MESSAGE
        setValues(initialValues) // RESET VALUES
        fetchTasks(0) // REFRESH TASK LIST
      }

    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // HANDLE EDIT
  const handleEdit = () => {
    setIsEditing(true)
    setValues(
      {
        name: row.name,
        description: row.description
      }
    )
  }

  // HANDLE DELETE
  const handleDelete = async (id: number) => {
    setLoading(true); // LOADING
    try {
      // DELETE TASK
      const response = await deleteTask(id);

      // SUCCESS
      if (response?.success) {
        toast.success(response?.userMessage) // TOAST SUCCESS MESSAGE
        fetchTasks(0) // REFRESH TASK LIST
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // HANDLE CANCEL EDIT
  const handleCancelEdit = () => {
    setIsEditing(false)
    setValues(initialValues)
  }

  // HANDLE TASK UPDATION
  const handleTaskUpdation = async (id: number) => {
    setLoading(true); // LOADING
    const validationErrors = validate(values); // VALIDATION

    // VALIDATION
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // PAYLOAD
      const payLoad = {
        name: values.name,
        description: values.description
      };

      // UPDATE TASK
      const response = await updateTask(id, payLoad);

      // SUCCESS
      if (response?.success) {
        toast.success(response?.userMessage) // TOAST SUCCESS MESSAGE
        setValues(initialValues) // RESET VALUES
        setIsEditing(false) // TOGGLE EDIT MODE
        fetchTasks(0) // REFRESH TASK LIST
      }
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
              <Box display="flex" justifyContent="center" alignItems="center">
                <LoadingButton
                  size="small"
                  type="button"
                  color="inherit"
                  variant="contained"
                  sx={{ mt: 2, mr: 1 }}
                  onClick={handleEdit}
                >
                  Edit
                </LoadingButton>

                <LoadingButton
                  size="small"
                  type="button"
                  color="inherit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleOpen}
                >
                  Delete
                </LoadingButton>

                {/* Dialog Popup */}
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    <Typography>Are you sure you want to delete this item?</Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={() => handleDelete(Number(row.id))} color="error" variant="contained">
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )
        }
      </TableCell>
    </TableRow>
  );
};
