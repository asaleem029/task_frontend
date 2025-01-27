import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type TaskTableToolbarProps = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TaskTableToolbar = ({ filterName, onFilterName }: TaskTableToolbarProps) => (
  <Toolbar
    sx={{
      height: 96,
      display: 'flex',
      justifyContent: 'space-between',
      p: (theme) => theme.spacing(0, 1, 0, 3),
    }}
  >
    <OutlinedInput
      fullWidth
      value={filterName}
      onChange={onFilterName}
      placeholder="Search task..."
      startAdornment={
        <InputAdornment position="start">
          <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
        </InputAdornment>
      }
      sx={{ maxWidth: 320 }}
    />
  </Toolbar>
)
