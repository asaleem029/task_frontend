import type { TableRowProps } from '@mui/material/TableRow';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

type TableEmptyRowsProps = TableRowProps & {
  emptyRows: number;
  height?: number;
};

export const TableEmptyRows = ({ emptyRows, height, sx, ...other }: TableEmptyRowsProps) => {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
        ...sx,
      }}
      {...other}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
