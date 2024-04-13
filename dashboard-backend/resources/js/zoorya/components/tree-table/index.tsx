import React from 'react'
import {Table, TableContainer, TableHead, TableRow, TableCell, Paper} from '@mui/material';
import {ExpandableCell} from './expandable-cell';
import ExpandableRow from './expandable-row';
import { ModalSpinner } from '../lib';
import { FormattedMessage } from 'react-intl';

const TreeTable = ({data, column, isLoading}: {data:any [], column:ExpandableCell [], isLoading:boolean}) => {
  if (isLoading) return <ModalSpinner />

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {column.map(col => (
              <TableCell key={col.header}>
                <FormattedMessage id={col.header} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.map(row => <ExpandableRow row={row} key={row.id} column={column}/>)}
      </Table>
    </TableContainer>
  );
}

export default TreeTable