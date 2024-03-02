/* eslint-disable react/prop-types */
import { Checkbox, Stack } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Box } from '@mui/system';

const ExpandFilter = ({ table }) => {
  return (
    <Box>
      <Box>
        <Checkbox
          checked={table.getIsAllColumnsVisible()}
          onChange={table.getToggleAllColumnsVisibilityHandler()}
        />{' '}
        <FormattedMessage id="toggle_all" />
      </Box>
      <Stack flexDirection='row' gap={2}>
        {table.getAllLeafColumns().map(column => {
          return (
            <Box key={column.id}>
              <Checkbox
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              <FormattedMessage id={column.id} />
            </Box>
          )
        })}
      </Stack>
    </Box>


  )
}

export default ExpandFilter