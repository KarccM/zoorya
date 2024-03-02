import Iconify from '@/components/Iconify';
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Authorize from '@/components/Authorize';

export default function Show({ id, showPermission }) {
  return (
    <Authorize permission={showPermission} >
      <MenuItem
        component={Link}
        to={`${id}`}
        sx={{ color: "text.secondary" }}
      >
        <ListItemIcon>
          <Iconify icon="mdi:show" width={24} height={24} />
        </ListItemIcon>
        <ListItemText
          primary={<FormattedMessage id="show" />}
          primaryTypographyProps={{ variant: "body2" }}
        />
      </MenuItem>
    </Authorize>
  );
}