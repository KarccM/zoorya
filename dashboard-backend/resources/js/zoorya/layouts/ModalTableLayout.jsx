import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '@/components/Iconify';
import Page from '@/components/Page';
import { FormattedMessage } from 'react-intl';
import Breadcrumbs from '@/components/breadcrumbs';
import usePageTitle from '../hooks/usePageTitle';
import Authorize from '@/components/Authorize';

export default function ModalTableLayout({ table, filtersForm = null, config, openConfirmationModal, children, readOnly = false, breadcrumbs = true, showTitle = true, title = null }) {
  const { title: PageTitle } = usePageTitle();
  return <Page title={PageTitle}>
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {
          showTitle && <Typography variant="h4">
            {title ? <FormattedMessage id={title} /> : <FormattedMessage id={PageTitle} />}
          </Typography>
        }
        {
          !readOnly && <Authorize permission={config.create.permission} >
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={openConfirmationModal}
            >
              <FormattedMessage id={config.create.label} />
            </Button>
          </Authorize>}
      </Stack>
      {breadcrumbs && <Breadcrumbs />}
      {filtersForm}
      {table}
      {children}
    </Container>
  </Page>
}