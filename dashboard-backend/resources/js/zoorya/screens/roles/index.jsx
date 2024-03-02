import * as React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import ReactTableV2 from "@/components/ReactTableV2";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { tableColumns } from "./data";
import { useQuery } from "react-query";
import { useClient } from "@/context/auth-context";
import { FormattedMessage } from "react-intl";
import { getRouteWithLang } from "@/utils/routesHelpers";
import Breadcrumbs from "@/components/breadcrumbs";
import queryString from "query-string";
import { readQueryParams } from '@/hooks/useFilter';
import { errorWithCustomMessage } from "@/utils/notifications";
export default function Roles() {
    const columns = useMemo(() => tableColumns, []);
    const client = useClient();
    const fetchDataOptions = readQueryParams();
    const { data: roles, isLoading } = useQuery(
        ["roles", fetchDataOptions],
        () => client(`roles?${queryString.stringify(fetchDataOptions)}`),
        {
            keepPreviousData: true,
            onError: () => {
                errorWithCustomMessage("failed_with_reload_msg");
            },
        }
    );

    return (
        <Page title="All Roles">
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                >
                    <Typography variant="h4">
                        <FormattedMessage id="roles" />
                    </Typography>

                    <Button
                        variant="contained"
                        component={RouterLink}
                        to={getRouteWithLang("/roles/add")}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        <FormattedMessage id="new_role" />
                    </Button>
                </Stack>
                <Breadcrumbs />
                <ReactTableV2
                    columns={columns}
                    tableData={roles}
                    isToolbar={false}
                    isLoading={isLoading}
                />
            </Container>
        </Page>
    );
}
