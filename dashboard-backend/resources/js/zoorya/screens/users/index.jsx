import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import { FormattedMessage } from "react-intl";
import queryString from "query-string";

import { Button, Container, Stack } from "@mui/material";

import { readQueryParams } from '@/hooks/useFilter';
import { getRouteWithLang } from "@/utils/routesHelpers";
import ReactTableV2 from "@/components/ReactTableV2";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { useClient } from "@/context/auth-context";
import Breadcrumbs from "@/components/breadcrumbs";
import Authorize from '@/components/Authorize';
import config from "./config";
import { tableColumns } from "./data";
import FiltersForm from "./filters";


export default function Users() {
    const columns = useMemo(() => tableColumns, []);
    const client = useClient();
    const fetchDataOptions = readQueryParams()
    const { data: users, isLoading } = useQuery(["users", fetchDataOptions], () => client(`users?${queryString.stringify(fetchDataOptions)}`), { keepPreviousData: true });
    return (
        <Page title="All Users">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                    <Breadcrumbs />
                    <Authorize permission={config.create.permission} >
                        <Button variant="contained" component={RouterLink} to={getRouteWithLang("/users/add")} startIcon={<Iconify icon="eva:plus-fill" />}>
                            <FormattedMessage id="new_user" />
                        </Button>
                    </Authorize>
                </Stack>
                <FiltersForm />
                <ReactTableV2 columns={columns} tableData={users} isToolbar={false} isLoading={isLoading} />
            </Container>
        </Page>
    );
}
