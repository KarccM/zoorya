import { ListItemText, ListItemIcon, MenuItem } from "@mui/material";
import Authorize from '@/components/Authorize';
import Iconify from '@/components/Iconify';
import { FormattedMessage } from "react-intl";

export default function EditWithModal({ setModal, editPermission }) {

  //config.permission.edit
  return (
    <Authorize permission={editPermission} >
      <MenuItem sx={{ color: 'text.secondary' }} onClick={() => { setModal(true) }}>
        <ListItemIcon>
          <Iconify icon="eva:edit-fill" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="edit" />} primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
    </Authorize>
  );

}