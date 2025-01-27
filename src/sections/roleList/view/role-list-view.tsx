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

import { fetchRolesList } from 'src/helpers/api/api';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { RoleTableRow } from '../role-table-row';
import { RoleTableHead } from '../role-table-head';
import { applyFilter, getComparator } from '../utils';
import { RoleTableToolbar } from '../role-table-toolbar';

import type { RoleProps } from '../role-table-row';

export const RoleListView = () => {
  // const navigate = useNavigate();
  const [filterName, setFilterName] = useState('');
  const [rolesList, setRolesList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>();
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('accessLevel');
  const [rowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [addNewRow, setAddNewRow] = useState(false);

  // FETCH ROLES LIST
  const fetchRoles = async (pageNo: number) => {
    const response = await fetchRolesList(pageNo)

    if (response) {
      setPagination(response.pagination);
      setRolesList(response.data);
    }
  };

  // SET ROLES LIST IN DATA FILTERED
  const dataFiltered: RoleProps[] = applyFilter({
    inputData: rolesList,
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
    fetchRoles(newPage + 1);
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
    fetchRoles(0);
  }, []);

  // // HANDLE ADD NEW ROLE
  // const handleAddNewRow = () => {
  //   navigate('/new-role');
  // };

  const handleAddNewRow = () => {
    const hasEmptyRow = rolesList.some(role => !role.id);

    if (!hasEmptyRow) {
      setAddNewRow(true)
      setRolesList([
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
    const filteredList = dataFiltered.filter(role => role.id); // Remove rows without an id
    setRolesList(filteredList);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Roles List
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAddNewRow}
        >
          New Role
        </Button>
      </Box>

      <Card>
        <RoleTableToolbar
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <RoleTableHead
                order={order}
                orderBy={orderBy}
                onSort={onSort}
                headLabel={[
                  { id: '#', label: '#' },
                  { id: 'name', label: 'Name' },
                  { id: 'slug', label: 'Slug' },
                  { id: 'accessLevel', label: 'Access Level' },
                  { id: 'isActive', label: 'Is-Active' },
                  { id: 'isManagerial', label: 'Is-Managerial' },
                  { id: 'hasModificationAccess', label: 'Has Modification Access' },
                  { id: 'description', label: 'Description' },
                  { id: '--', label: '--' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row, index) => (
                  <RoleTableRow
                    key={row.id}
                    row={row}
                    index={index}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    addNewRow={addNewRow}
                    handleCancel={handleCancel}
                    fetchRoles={fetchRoles}
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
