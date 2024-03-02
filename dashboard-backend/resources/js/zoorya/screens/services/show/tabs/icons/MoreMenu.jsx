import ConfirmationModal from '@/components/ConfirmationModal';
import Iconify from '@/components/Iconify';
import { useClient } from '@/context/auth-context';
import { errorWithCustomMessage, successWithCustomMessage } from '@/utils/notifications';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, styled } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';
import config from './config';
import Authorize from '@/components/Authorize';
import ClickAwayModal from '@/components/ClickAwayModal';
import Form from './Form';
// ----------------------------------------------------------------------

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main,
}));

// ----------------------------------------------------------------------

export default function MoreMenu({ id }) {
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const client = useClient();
  const queryClient = useQueryClient();
  const [Modal, setModal] = useState();

  const { mutate: handleRemoveClick, isLoading } = useMutation(({ id }) => client(`${config.url}/${id}`, { method: 'DELETE' }), {
    onSuccess: () => {
      queryClient.invalidateQueries(config.queryClient.list);
      setIsOpen(false);
      successWithCustomMessage('delete_success_msg');
    },
    onError: (data) => {
      if (!data.success) {
        errorWithCustomMessage(data?.error);
      }
      setIsOpen(false);
    },
  });

  return (
    <>
      {openConfirmation && (
        <ConfirmationModal
          isLoading={isLoading}
          onSave={() => {
            handleRemoveClick({ id });
            setOpenConfirmation(false);
          }}
          closeConfirmation={() => {
            setOpenConfirmation(false);
          }}
          message={<FormattedMessage id="delete" />}
          confirmation={openConfirmation}
        />
      )}
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <Authorize permission={config.update.permission} >
          <MenuItem sx={{ color: 'text.secondary' }} onClick={() => { setModal(true) }}>
            <ListItemIcon>
              <Iconify icon="eva:edit-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary={<FormattedMessage id="edit" />} primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </Authorize>

        <Authorize permission={config.delete.permission} >
          <StyledMenuItem onClick={() => setOpenConfirmation(true)}>
            <ListItemIcon>
              <Iconify icon="eva:trash-2-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary={<FormattedMessage id="delete" />} primaryTypographyProps={{ variant: 'body2' }} />
          </StyledMenuItem>
        </Authorize>
      </Menu>
      {Modal &&
        <ClickAwayModal handleClose={() => setModal(false)} open={Modal}>
          <Form cancel={() => setModal(false)} Id={id} />
        </ClickAwayModal>}
    </>
  );
}