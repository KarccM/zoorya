import Iconify from '@/components/Iconify';
import { IconButton, Menu } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';
import EditWithNavigation from './edit-with-navigation/index';
import Remove from './remove/index';
import Show from './show/index';

export default function MenuWithChildren({ id, config, children }) {
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
        {config.show?.permission && <Show id={id} showPermission={config.show?.permission} />}
        {children}
        <Remove id={id} deletePermission={config.delete.permission} config={config} setIsOpen={setIsOpen} />
      </Menu>
    </>
  );
}
