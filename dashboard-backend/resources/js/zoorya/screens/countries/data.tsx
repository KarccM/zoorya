import React from "react";
import MoreMenu from "./partials/MoreMenu"
import SwitchAction from "./partials/SwitchAction";
import { TableCell , TableCellWithOverride } from "../../types/table";
export const tableColumns : (TableCell|TableCellWithOverride)[] = [
    {
        header: "name",
        accessorKey: "name",
        enableSorting: false,
    },
    {
        header: "iso2",
        accessorKey: "iso2",
        enableSorting: false,
    },
    {
        header: "phoneNumberCode",
        accessorKey: "phoneNumberCode",
        enableSorting: false,
    },
    {
        header: "active",
        accessorKey: "active",
        enableSorting: false,
        cell: ({ row }) => (<SwitchAction original={row.original} value={row.original.active}/>),
      },
    {
        header: "actions",
        accessorKey: "actions",
        cell: ({ row }) => (<MoreMenu id={row.original.id}/>),
        enableSorting: false,
    },
];
