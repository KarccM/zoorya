import React from "react";
import MoreMenu from "./Partials/MoreMenu";
import { TableCell , TableCellWithOverride } from "../../types/table";
export const tableColumns : (TableCell|TableCellWithOverride)[] = [
    {
        header: "name",
        accessorKey: "name",
        enableSorting: false,
    },
    {
        header: "actions",
        accessorKey: "actions",
        cell: ({ row }) => (<MoreMenu id={row.original.id}/>),
        enableSorting: false,
    },
];
