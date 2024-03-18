import Form from './partials/form';
import { Box, Container, Paper } from '@mui/material';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/breadcrumbs';
import usePageMetadata from '@/hooks/usePageMetadata';

export default () => {
  const { title } = usePageMetadata
  return (
    <Page title={title}>
      <Container maxWidth="80">
        <Box mb={4}>
          <Breadcrumbs />
        </Box>
        <Paper sx={{ p: 1 }} elevation={3}>
          <Form />
        </Paper>
      </Container>
    </Page>
  )
}
