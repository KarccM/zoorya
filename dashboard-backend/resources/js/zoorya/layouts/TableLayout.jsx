import { Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '@/components/Iconify';
import Page from '@/components/Page';
import { FormattedMessage } from 'react-intl';
import { getRouteWithLang } from '@/utils/routesHelpers';
import Breadcrumbs from '@/components/breadcrumbs';
import usePageTitle from '../hooks/usePageTitle';
import Authorize from '@/components/Authorize';

export default function TableLayout({ table, filtersForm = null, config, children, readOnly = false, breadcrumbs = true, showTitle = true, title }) {
  const { title: PageTitle } = usePageTitle();
  return <Page title={title}>
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        {showTitle && <Typography variant="h4">
          {title ? <FormattedMessage id={title} /> : <FormattedMessage id={PageTitle} />}
        </Typography>
        }
        {
          !readOnly && <Authorize permission={config.create.permission} >
            <Button
              variant="contained"
              component={RouterLink}
              to={getRouteWithLang(`/${config.url}/add`)}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              <FormattedMessage id={config.create.label} />
            </Button>
          </Authorize>
        }
      </Stack>
      {breadcrumbs && <Breadcrumbs />}
      {filtersForm}
      {table}
      {children}
    </Container>
  </Page>
}