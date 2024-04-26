import React from "react";
import { ExpandableCell } from "../../components/tree-table/expandable-cell";
import config from "./config";
import Iconify from "../../components/Iconify";
import ExpandedIcon from "../../components/icons/expand-icon";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Authorize from '../../components/Authorize';
import { useNavigate } from "react-router-dom";

export const tableColumns: ExpandableCell[] = [
    {
        header: "name",
        render: ({ row, expanded, setExpanded, lvl }) => (
            <Stack flexDirection="row" gap={1} alignItems="center" sx={{ paddingInlineStart: `${lvl}rem` }}>
                <IconButton
                    type="button"
                    color="primary"
                    onClick={() => setExpanded(prev => !prev)}
                    disabled={!row.children?.length && !row.animals?.length}
                >
                    {!row.type ?
                        <ExpandedIcon expanded={expanded} sx={{ width: 20, height: 20, }} /> :
                        <Iconify icon={`mdi-${row.type?.toLowerCase()}`} sx={{ width: 20, height: 20 }} />
                    }
                </IconButton>


                <Typography component="span">{row?.name}</Typography>
            </Stack>
        ),
    },
    {
        header: "actions",
        render: ({ row }) => {
            const navigate = useNavigate();

            if (row.type) return (
                <>
                    <Authorize permission={config.update.permission}>
                        <Tooltip title={<FormattedMessage id="edit" />}>
                            <IconButton color="info" onClick={() => navigate(`${row.categoryId}/${row.type}s/${row.id}/edit`)}>
                                <Iconify icon="tabler:edit" />
                            </IconButton>
                        </Tooltip>
                    </Authorize>
                    <Authorize permission={config.delete.permission}>
                        <Tooltip title={<FormattedMessage id="delete" />}>
                            <IconButton color="error">
                                <Iconify icon="ic:round-delete" />
                            </IconButton>
                        </Tooltip>
                    </Authorize>
                </>
            );


            return (
                <>
                    <Stack flexDirection="row" rowGap={1}>
                        <Authorize permission={config.create.permission}>
                            <Tooltip title={<FormattedMessage id="add" />}>
                                <IconButton color="success" onClick={() => navigate(`${row.id}/add`)}>
                                    <Iconify icon="tabler:plus" />
                                </IconButton>
                            </Tooltip>
                        </Authorize>
                        <Authorize permission="Animal.create">
                            <Tooltip title={<FormattedMessage id="add dog" />}>
                                <IconButton color="default" onClick={() => navigate(`${row.id}/dogs/add`)}>
                                    <Iconify icon="mdi-dog" />
                                </IconButton>
                            </Tooltip>
                        </Authorize>
                        <Authorize permission="Animal.create">
                            <Tooltip title={<FormattedMessage id="add cat" />}>
                                <IconButton color="warning" onClick={() => navigate(`${row.id}/cats/add`)}>
                                    <Iconify icon="mdi-cat" />
                                </IconButton>
                            </Tooltip>
                        </Authorize>
                        <Authorize permission={config.update.permission}>
                            <Tooltip title={<FormattedMessage id="edit" />}>
                                <IconButton color="info" onClick={() => navigate(`${row.id}/edit`)}>
                                    <Iconify icon="tabler:edit" />
                                </IconButton>
                            </Tooltip>
                        </Authorize>
                        <Authorize permission={config.delete.permission}>
                            <Tooltip title={<FormattedMessage id="delete" />}>
                                <IconButton color="error">
                                    <Iconify icon="ic:round-delete" />
                                </IconButton>
                            </Tooltip>
                        </Authorize>
                    </Stack>
                </>
            )
        },
    },
];
