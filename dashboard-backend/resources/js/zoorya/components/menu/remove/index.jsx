import * as React from 'react';
import { useClient } from '@/context/auth-context';
import { useMutation, useQueryClient } from 'react-query';
import { ListItemIcon, ListItemText, MenuItem, styled } from '@mui/material';
import Authorize from '@/components/Authorize';
import Iconify from '@/components/Iconify';
import { FormattedMessage } from 'react-intl';
import ConfirmationModal from "@/components/ConfirmationModal";
import { successWithCustomMessage } from '@/utils/notifications';
import { errorWithCustomMessage } from '@/utils/notifications';

export default function Remove({ id, deletePermission, config, setIsOpen }) {
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const client = useClient();
  const queryClient = useQueryClient();

  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.error.main,
  }));


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
      <Authorize permission={deletePermission} >
        <StyledMenuItem onClick={() => setOpenConfirmation(true)}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={<FormattedMessage id="delete" />} primaryTypographyProps={{ variant: 'body2' }} />
        </StyledMenuItem>
      </Authorize>
      {
        openConfirmation && (
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
        )
      }
    </>
  );
}