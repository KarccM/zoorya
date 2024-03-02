import React from "react";
import Menu from "../../components/Menu";
import { TableCell, TableCellWithOverride } from "../../types/table";
import config from "./config";
import SwitchAction from "./partials/switch-action";

export const tableColumns: (TableCell | TableCellWithOverride)[] = [
    {
        header: "title",
        accessorKey: "title",
        enableSorting: false,
    },
    {
        header: "publish",
        accessorKey: "publish",
        enableSorting: false,
        cell: ({ row }) => (<SwitchAction original={row.original} value={row.original.published} name="published" />),
    },
    {
        header: "actions",
        accessorKey: "actions",
        cell: ({ row }) => (<Menu id={row.original.id} config={config} />),
        enableSorting: false,
    },
];
