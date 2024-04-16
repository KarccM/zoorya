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
            <Stack flexDirection="row" rowGap={1} alignItems="center" sx={{ pl: `${lvl}rem` }}>
                <IconButton disabled={!row.children?.length && !row.animals?.length} color="primary" type="button" onClick={() => setExpanded(prev => !prev)}>
                    <ExpandedIcon
                        sx={{ width: 20, height: 20, }}
                        expanded={expanded}
                    />
                </IconButton>
                <Typography component="span">
                    {row?.name}
                </Typography>
            </Stack>
        ),
    },
    {
        header: "actions",
        render: ({ row }) => {
            const navigate = useNavigate();
            return (
                <>
                    <Stack flexDirection="row" rowGap={1}>
                        <Authorize permission={config.create.permission}>
                            <Tooltip title={<FormattedMessage id="add category" />}>
                                <IconButton color="success" onClick={() => navigate(`${row.id}/add`)}>
                                    <Iconify icon="tabler:plus" />
                                </IconButton>
                            </Tooltip>
                        </Authorize>
                        {/* <Authorize permission="Animal.create"> */}
                        <Tooltip title={<FormattedMessage id="add dog" />}>
                            <IconButton color="default" onClick={() => navigate(`${row.id}/dog/add`)}>
                                <Iconify icon="mdi-dog" />
                            </IconButton>
                        </Tooltip>
                        {/* </Authorize> */}
                        {/* <Authorize permission="Animal.create"> */}
                        <Tooltip title={<FormattedMessage id="add cat" />}>
                            <IconButton color="warning" onClick={() => navigate(`${row.id}/cat/add`)}>
                                <Iconify icon="mdi-cat" />
                            </IconButton>
                        </Tooltip>
                        {/* </Authorize> */}
                        <Authorize permission={config.update.permission}>
                            <Tooltip title={<FormattedMessage id="edit category" />}>
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
