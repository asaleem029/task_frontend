import { toast } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { fetchTasksList } from 'src/helpers/api/api';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { TaskTableRow } from '../task-table-row';
import { TaskTableHead } from '../task-table-head';
import { applyFilter, getComparator } from '../utils';
import { TaskTableToolbar } from '../task-table-toolbar';

import type { TaskProps } from '../task-table-row';

export const TaskListView = () => {
  // const navigate = useNavigate();
  const [filterName, setFilterName] = useState('');
  const [tasksList, setTasksList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>();
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('accessLevel');
  const [rowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [addNewRow, setAddNewRow] = useState(false);

  // FETCH TASKS LIST
  const fetchTasks = async (pageNo: number) => {
    const response = await fetchTasksList(pageNo)

    if (response) {
      // setPagination(response.pagination);
      // setTasksList(response.data);
    }
  };

  // SET TASKS LIST IN DATA FILTERED
  const dataFiltered: TaskProps[] = applyFilter({
    inputData: tasksList,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const notFound = !dataFiltered.length && !!filterName;

  // HANDLE PAGE RESETING ON FILTERING
  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  // HANDLE PAGE CHANGING
  const onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    fetchTasks(newPage + 1);
  };

  // HANDLE TABLE SPRTING
  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  useEffect(() => {
    fetchTasks(0);
  }, []);

  // // HANDLE ADD NEW TASK
  // const handleAddNewRow = () => {
  //   navigate('/new-task');
  // };

  const handleAddNewRow = () => {
    const hasEmptyRow = tasksList.some(task => !task.id);

    if (!hasEmptyRow) {
      setAddNewRow(true)
      setTasksList([
        ...dataFiltered,
        {
          name: '',
          slug: '',
          accessLevel: 0,
          isActive: false,
          isManagerial: false,
          hasModificationAccess: false,
          description: ''
        }
      ]);
    } else {
      toast.info("Please Complete Existing One");
    }
  };

  // HANDLE CANCEL BUTTON
  const handleCancel = () => {
    const filteredList = dataFiltered.filter(tasks => tasks.id); // Remove rows without an id
    setTasksList(filteredList);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Tasks List
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAddNewRow}
        >
          New Task
        </Button>
      </Box>

      <Card>
        <TaskTableToolbar
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TaskTableHead
                order={order}
                orderBy={orderBy}
                onSort={onSort}
                headLabel={[
                  { id: '#', label: '#' },
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: '--', label: '--' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row, index) => (
                  <TaskTableRow
                    key={row.id}
                    row={row}
                    index={index}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    addNewRow={addNewRow}
                    handleCancel={handleCancel}
                    fetchTasks={fetchTasks}
                  />
                ))}
                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={page}
          count={pagination?.totalCount ? pagination?.totalCount : 0}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          rowsPerPageOptions={[10]}
        />
      </Card>
    </DashboardContent>
  );
};
