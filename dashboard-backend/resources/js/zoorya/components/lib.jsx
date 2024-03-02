import { FormattedMessage } from 'react-intl';
import LoadingBlocks from './loading-blocks/index';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Alert, Box, Button, Stack } from '@mui/material';

const FullPageSpinner = () => <LoadingBlocks />

const ModalSpinner = () => <LoadingBlocks height='500px' />

function FullPageErrorFallback() {
    const error = useRouteError()
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'grid', height: '100vh', placeItems: 'center' }}>
            <Stack gap={1}>
                <Alert severity="error" variant="filled" >
                    <p>
                        <FormattedMessage id="full_page_error" />
                    </p>
                    <pre>{error?.message}</pre>
                </Alert>
                <Button onClick={() => navigate('statistics')}><FormattedMessage id="back_home" /></Button>
            </Stack>
        </Box>
    )
}
export { FullPageErrorFallback, FullPageSpinner, ModalSpinner };
