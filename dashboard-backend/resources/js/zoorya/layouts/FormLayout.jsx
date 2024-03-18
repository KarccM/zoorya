import { Container, Paper, Stack, Typography } from '@mui/material';
import Page from '@/components/Page';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Breadcrumbs from '@/components/breadcrumbs';
import usePageMetadata from '@/hooks/usePageMetadata';

export default function FormLayout({ form, label }) {
  const { title } = usePageMetadata();
  return (
    <Page title={title}>
      <Container maxWidth="80">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id={label} />
          </Typography>
        </Stack>
        <Breadcrumbs />
        <Paper sx={{ padding: 2 }}>
          {form}
        </Paper>
      </Container>
    </Page>
  );
}
