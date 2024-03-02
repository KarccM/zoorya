import React from 'react';
import MoreMenu from './MoreMenu';
import { getDateFromISO } from '@/utils/formatTime';
import { Avatar, Stack, Typography } from '@mui/material';
import ImageModal from './ImageModal';
let storage = import.meta.env.VITE_STORAGE;

export const tableColumns = [
  {
    header: 'title',
    accessorKey: 'title',
    enableSorting: false,
    cell: ({ row }) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <ImageModal image={`${storage}/${row.original.fileUrl}`} />
        <Typography variant="subtitle2" noWrap>
          {row.original.title}
        </Typography>
      </Stack>
    ),
  },
  {
    header: 'created_at',
    accessorKey: 'createdAt',
    cell: ({ row }) => <span>{getDateFromISO(row?.original?.createdAt)}</span>,
  },
  {
    header: 'actions',
    accessorKey: 'actions',
    cell: ({ row }) => <MoreMenu id={row.original.id} />
    ,
    style: {
      textAlign: 'right',
    },
    enableSorting: false,
  },
];
