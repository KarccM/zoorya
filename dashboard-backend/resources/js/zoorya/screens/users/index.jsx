import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import { FormattedMessage } from "react-intl";
import queryString from "query-string";

import { Button, Container, Stack, Typography } from "@mui/material";

import { readQueryParams } from '@/hooks/useFilter';
import { getRouteWithLang } from "@/utils/routesHelpers";
import { errorWithCustomMessage } from '@/utils/notifications';
import ReactTableV2 from "@/components/ReactTableV2";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { useClient } from "@/context/auth-context";
import Breadcrumbs from "@/components/breadcrumbs";

import { tableColumns } from "./data";
import FiltersForm from "./filters";


export default function Users() {
    const columns = useMemo(() => tableColumns, []);
    const client = useClient();
    const fetchDataOptions = readQueryParams()
    const { data: users, isLoading } = useQuery(["users", fetchDataOptions], () => client(`users?${queryString.stringify(fetchDataOptions)}`), { keepPreviousData: true, onError: () => errorWithCustomMessage("failed_with_reload_msg") });
    return (
        <Page title="All Users">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="h4">
                        <FormattedMessage id="users" />
                    </Typography>

                    <Button variant="contained" component={RouterLink} to={getRouteWithLang("/users/add")} startIcon={<Iconify icon="eva:plus-fill" />}>
                        <FormattedMessage id="new_user" />
                    </Button>
                </Stack>
                <Breadcrumbs />
                <FiltersForm />
                <ReactTableV2 columns={columns} tableData={users} isToolbar={false} isLoading={isLoading} />
            </Container>
        </Page>
    );
}
