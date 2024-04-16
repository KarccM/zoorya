import React, { useState } from 'react'
import { TableRow, TableBody, TableCell } from '@mui/material'
import { ExpandableCell } from './expandable-cell';

const ExpandableRow = ({ row, column, lvl = 0, childrenKey = "children" }: { row: any, column: ExpandableCell[], lvl: number, childrenKey?: string }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <TableBody>
        <TableRow>
          {column.map((_, index) => (
            <TableCell key={index}>
              {_.render({ row, expanded, setExpanded, lvl })}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
      {expanded && row.children?.length > 0 && row.children.map((child, index) => <ExpandableRow key={index} row={child} column={column} lvl={lvl + 1} />)}

      {expanded && row[childrenKey]?.length > 0 && row[childrenKey].map((child, index) => <ExpandableRow key={index} row={child} column={column} lvl={lvl + 1} />)}
    </>
  )
}

export default ExpandableRow