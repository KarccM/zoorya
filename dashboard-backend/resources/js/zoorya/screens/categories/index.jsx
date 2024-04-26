import React from "react"
import queryString from 'query-string';
import { tableColumns } from './data';
import { useQuery } from 'react-query';
import config from './config';
import { useClient } from '@/context/auth-context';
import { readQueryParams } from '@/hooks/useFilter';
import { Button, Container, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '@/components/Iconify';
import Page from '@/components/Page';
import { FormattedMessage } from 'react-intl';
import { getRouteWithLang } from '@/utils/routesHelpers';
import Breadcrumbs from '@/components/breadcrumbs';
import usePageMetadata from '../../hooks/usePageMetadata';
import Authorize from '@/components/Authorize';
import TreeTable from '../../components/tree-table';

export default function Faqs() {
  const { title } = usePageMetadata();
  const columns = React.useMemo(() => tableColumns, []);
  const client = useClient();

  let fetchDataOptions = readQueryParams();

  const { data: faqs, isLoading } = useQuery(
    [config.queryClient.list, fetchDataOptions],
    () => client(`${config.url}?${queryString.stringify(fetchDataOptions)}`),
    { keepPreviousData: true }
  );

  return (
    <Page title={title}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Breadcrumbs />
          <Authorize permission={config.create.permission} >
            <Button variant="contained" component={RouterLink} to={getRouteWithLang(`/${config.url}/add`)} startIcon={<Iconify icon="eva:plus-fill" />}>
              <FormattedMessage id={config.create.label} />
            </Button>
          </Authorize>
        </Stack>
        <TreeTable column={columns} data={faqs?.data} isLoading={isLoading} />
      </Container>
    </Page>
  );
}
