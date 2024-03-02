import React from "react";
import { getDateFromISO } from "@/utils/formatTime";
import { useAuth } from "@/context/auth-context";
import Label from "@/components/Label";
import MoreMenu from "./partials/MoreMenu";

export const tableColumns = [
    {
        header: "name",
        accessorKey: "username",
        enableSorting: false,
    },
    {
        header: "email",
        accessorKey: "email",
        enableSorting: false,
    },
    {
        header: "active",
        accessorKey: "is_active",
        enableSorting: false,
        cell: ({ row }) => {
            let label = row?.original?.active ? "true" : "false";
            return <Label variant="ghost" color={label === "true" ? "success" : "error"} title={label} />
        },
    },
    {
        header: "created_at",
        accessorKey: "createdAt",
        cell: ({ row }) => (
            <span>{getDateFromISO(row?.original?.createdAt)}</span>
        ),
        enableSorting: false,
    },
    {
        header: "actions",
        accessorKey: "actions",
        cell: ({ row }) => {
            const { user } = useAuth();
            if (row.original.id === user.id) return <></>
            return <MoreMenu id={row?.original?.id} />
        },
        enableSorting: false,
    },
];
