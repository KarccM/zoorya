import { LoadingButton } from '@mui/lab'
import { Stack } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { styled } from '@mui/material/styles'
import { ClickAwayModal } from './StyledComponents';

const StyledStack = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '90%',
  height: '85%',
}))

const Header = styled('header')(({ theme }) => ({
  fontSize: '32px',
}))

//---------------------------------------------------------------
interface Props {
  confirmation: boolean,
  isLoading: boolean,
  closeConfirmation: () => void,
  onSave: () => void,
}

const ConfirmationModal: React.FC<Props> = ({
  confirmation,
  closeConfirmation,
  onSave,
  isLoading,
}) => {
  return (
    <>
      <ClickAwayModal
        open={confirmation}
        handleClose={closeConfirmation}
      >
        <Header>
          <FormattedMessage id="are_you_sure" />
        </Header>
        <FormattedMessage id="you_won't_be_able_to_revert_this!" />
        <StyledStack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ my: 2 }}
        >
          <LoadingButton
            onClick={closeConfirmation}
            size="large"
            variant="contained"
            sx={{ mr: 2 }}
          >
            <FormattedMessage id="cancel" />
          </LoadingButton>
          <LoadingButton
            size="large"
            type="button"
            variant="contained"
            onClick={onSave}
            loading={isLoading}
          >
            <FormattedMessage id="confirm" />
          </LoadingButton>
        </StyledStack>
      </ClickAwayModal>

    </>
  )
}
export default ConfirmationModal
