import React from "react";
import Menu from '@/components/menu';
import { TableCell, TableCellWithOverride } from "../../types/table";
import config from './config';
export const tableColumns: (TableCell | TableCellWithOverride)[] = [
    {
        header: "titleAr",
        accessorKey: "titleAr",
        enableSorting: false,
    },
    {
        header: "titleEn",
        accessorKey: "titleEn",
        enableSorting: false,
    },
    {
        header: "descriptionAr",
        accessorKey: "descriptionAr",
        enableSorting: false,
    },
    {
        header: "descriptionEn",
        accessorKey: "descriptionEn",
        enableSorting: false,
    },
    {
        header: "actions",
        accessorKey: "actions",
        cell: ({ row }) => (<Menu id={row.original.id} config={config} />),
        enableSorting: false,
    },
];
