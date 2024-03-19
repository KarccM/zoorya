import React from "react";
import Menu from '@/components/menu';
import { TableCell, TableCellWithOverride } from "../../types/table";
import config from './config';
import PreviewableImage from "../../components/previewable-image";

export const tableColumns: (TableCell | TableCellWithOverride)[] = [
    {
        header: "slider",
        accessorKey: "path",
        enableSorting: false,
        cell: ({ row }) => <PreviewableImage src={row.original.path} />
    },
    {
        header: "order",
        accessorKey: "order",
        enableSorting: false,
    },
    {
        header: "actions",
        accessorKey: "actions",
        cell: ({ row }) => (<Menu id={row.original.id} config={config} />),
        enableSorting: false,
    },
];
