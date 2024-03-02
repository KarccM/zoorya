import { Link as RouterLink } from 'react-router-dom';
import { ListItemText, ListItemIcon, MenuItem } from "@mui/material";
import Authorize from '@/components/Authorize';
import Iconify from '@/components/Iconify';
import { FormattedMessage } from 'react-intl';

export default function EditWithNavigation({ id, editPermission }) {
  return (
    <Authorize permission={editPermission} >
      <MenuItem
        component={RouterLink}
        to={`${id}/edit`}
        sx={{ color: "text.secondary" }}
      >
        <ListItemIcon>
          <Iconify icon="eva:edit-fill" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="edit" />} primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
    </Authorize>
  );

}