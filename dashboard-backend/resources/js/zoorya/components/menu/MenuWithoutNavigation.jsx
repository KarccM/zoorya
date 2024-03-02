import Iconify from '@/components/Iconify';
import { IconButton, Menu } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';
import Remove from './remove/index';
import Show from './show/index';

export default function TableMenu({ id, config, children }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
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
        <Show id={id} showPermission={config.permission.show} />
        {children}
        <Remove id={id} deletePermission={config.permission.delete} />
      </Menu>
    </>
  );
}
