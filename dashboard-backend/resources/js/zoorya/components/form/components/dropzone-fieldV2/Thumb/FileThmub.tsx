import React from "react";
import Iconify from '@/components/Iconify';
import { ExtendedFile } from './Factory';
import { FormattedMessage } from "react-intl";
import { Box, Button, Stack, Tooltip, Typography, styled } from "@mui/material";

const FileName = styled(Typography)(() => ({ textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap' }))

const StyledStack = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: 4,
  borderRadius: 4,
}));

export default ({ file, selectedForDelete }: { file: ExtendedFile, selectedForDelete: (file: ExtendedFile) => void }) => {
  return (
    <StyledStack direction="row" justifyContent="space-between">
      <Box sx={{ overflow: 'hidden' }}>
        <FileName variant="subtitle2">
          {file.name}
        </FileName>
        <Typography variant="caption" sx={{ color: 'GrayText' }}>
          {(file.size / (1000 * 1000)).toFixed(2)}MB
        </Typography>
      </Box>
      <Box>
        <Tooltip title={<FormattedMessage id="tap_delete" />}>
          <Button color="error" sx={{ minHeight: '100%' }}>
            <Iconify icon="zondicons:close-solid" />
          </Button>
        </Tooltip>
      </Box>
    </StyledStack>

  );
}