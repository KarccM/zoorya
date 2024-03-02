import InputPassword from '@/components/form/components/input-password'
import { useClient } from '@/context/auth-context'
import { successWithCustomMessage } from '@/utils/notifications'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Alert, Box, styled } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme?.palette?.mode === 'dark'
      ? theme?.palette?.grey[500_12]
      : theme?.palette?.grey[100],
  borderRadius: '16px',
  width: '100%',
  padding: '24px',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  boxShadow:
    'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
}))

// ----------------------------------------------------------------------

export default function ChangePassword() {
  const [backendErrors, setBackendErrors] = React.useState([])

  const client = useClient()
  const PasswordSchema = Yup.object().shape({
    old_password: Yup.string().required('old_password_is_required'),
    new_password: Yup.string()
      .min(8, 'new_password_min')
      .max(40, 'new_password_max')
      .required('new_password_is_required'),
    confirm_new_password: Yup.string().oneOf(
      [Yup.ref('new_password'), null],
      'passwords_must_match',
    ),
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  })

  const { mutate, isError, isLoading } = useMutation(
    data =>
      client('auth/change-password', {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: () => {
        successWithCustomMessage('password_updated_successfully')
        reset()
      },
      onError: error => {
        setBackendErrors(error.response.data.errors);
      },
    },
  )
  const onSubmitForm = data => {
    mutate({
      currentPassword: data.old_password,
      password: data.new_password,
      confirmPassword: data.confirm_new_password,
    })
  }

  return (
    <FormBox
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmitForm)}
    >
      {isError && <Alert severity="error"> {backendErrors.map((message) => <div key={message}>{message}</div>)} </Alert>}
      <InputPassword
        label="old_password"
        name="old_password"
        control={control}
        errors={errors}
      />
      <InputPassword
        label="new_password"
        name="new_password"
        control={control}
        errors={errors}
      />
      <InputPassword
        label="confirm_new_password"
        name="confirm_new_password"
        control={control}
        errors={errors}
      />
      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{ alignSelf: 'flex-end' }}
      >
        <FormattedMessage id="save" />
      </LoadingButton>
    </FormBox>
  )
}
