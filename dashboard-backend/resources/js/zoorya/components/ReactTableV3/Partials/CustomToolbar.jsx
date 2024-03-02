// material
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
// component
import Iconify from '../../Iconify'
import { GlobalFilter } from './ReactTableFilters'
import ExpandFilter from '../ExpandFilter';
import React from 'react';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}))

CustomToolbar.propTypes = {
  selectedRows: PropTypes.any,
  onDelete: PropTypes.func,
  globalFilter: PropTypes.any,
  setGlobalFilter: PropTypes.any,
  searchBox: PropTypes.bool,
  filtered: PropTypes.bool,
  table: PropTypes.object,
}

export default function CustomToolbar({
  selectedRows,
  onDelete,
  globalFilter,
  setGlobalFilter,
  searchBox = true,
  filtered = true,
  table,
}) {
  const [openExpandFilter, setOpenExpandFilter] = React.useState(false);
  let numSelected = selectedRows?.length
  const handleDelete = () => onDelete?.(selectedRows)
  return (
    <>
      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected > 0 &&
          <Typography component="div" variant="subtitle1">
            {numSelected} <FormattedMessage id="selected" />
          </Typography>
        }

        {searchBox &&
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        }

        {numSelected > 0 &&
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        }

        {filtered && (
          <Tooltip title="Filter list">
            <IconButton color={openExpandFilter ? 'primary' : ''} onClick={() => setOpenExpandFilter(prev => !prev)}>
              <Iconify icon="majesticons:filter" />
            </IconButton >
          </Tooltip>
        )}

      </RootStyle>

      {openExpandFilter && <ExpandFilter table={table} />}
    </>

  )
}
