import CustomDatePicker from '@/components/form/components/custom-date-picker';
import CustomInput from '@/components/form/components/custom-input';
import DropzoneField from '@/components/form/components/dropzone-field';
import Iconify from '@/components/Iconify';
import { FullPageSpinner } from '@/components/lib';
import { useAuth, useClient } from '@/context/auth-context';
import { errorWithCustomMessage, successWithCustomMessage } from '@/utils/notifications';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, CircularProgress, Grid, styled } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

const ContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '24px',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const AvatarBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme?.palette?.mode === 'dark' ? theme?.palette?.grey[500_12] : theme?.palette?.grey[100],
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'auto',
  maxHeight: '400px',
  padding: '24px',
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  [theme.breakpoints.up('xs')]: {
    minWidth: '100%',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: '33.3333%',
  },
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme?.palette?.mode === 'dark' ? theme?.palette?.grey[500_12] : theme?.palette?.grey[100],
  borderRadius: '16px',
  padding: '24px',
  height: 'fit_content',
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  [theme.breakpoints.up('xs')]: {
    minWidth: '100%',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: '66.6666%',
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '180px',
  height: '180px',
  backgroundColor: 'rgba(0 0 0 / 25%)',
  borderRadius: '50%',
  display: 'none',
  transition: 'all 0.5s ease',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
  color: theme?.palette?.mode === 'light' && 'white',
}));

const AvatarSection = styled(Box)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
  '&:hover .overlay': {
    display: 'flex',
    transition: 'display 500ms',
  },
});

const StyledAvatar = styled(Avatar)({
  width: '180px',
  height: '180px',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const client = useClient();
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('name_is_required'),
    lastName: Yup.string().required('name_is_required'),
    dateOfBirth: Yup.date().typeError('date_of_birth_is_required').required(),
    avatar: Yup.string().nullable(),
    gender: Yup.object().required('gender_is_required').typeError('gender_is_required'),
  });

  const { isLoading: fetchLoading, data: user } = useQuery({ queryKey: `profile`, queryFn: () => axios.get(`profile`) });

  useEffect(() => {
    if (!user) return
    console.log('user :>> ', user);
    reset({ ...user.data });
  }, [user]);

  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      avatar: '',
      gender: '',
      dateOfBirth: '',
      country: {}
    },
  });

  const { mutate: mutateUser, isLoading: userIsLoading } = useMutation(
    (data) =>
      axios({
        url: '',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: userAuth?.token ? `Bearer ${userAuth?.token}` : undefined,
        },
      }),
    {
      onSuccess: () => successWithCustomMessage('updated_success_msg'),
      onError: () => errorWithCustomMessage('something_went_wrong'),
    }
  );

  const { mutate: mutateAvatar, isLoading: AvatarIsLoading } = useMutation(
    (data) =>
      axios({
        url: profileUrl,
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: userAuth?.token ? `Bearer ${userAuth?.token}` : undefined,
        },
      }),
    {
      onSuccess: () => successWithCustomMessage('updated_success_msg'),
      onError: () => errorWithCustomMessage('something_went_wrong'),
    }
  );

  const onSubmitForm = ({ username, gender, dateOfBirth }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('gender', gender.value);
    formData.append('dateOfBirth', format(new Date(dateOfBirth), 'dd/MM/yyyy'));
    mutateUser(formData);
  };

  const onDropAccepted = () => {
    const formData = new FormData();
    formData.append('avatar', getValues('avatar'));
    mutateAvatar(formData);
  };

  const onFileChange = async (name, files) => {
    setValue(name, files);
    if (files?.file) {
      await trigger(['avatar']);
    }
  };

  if (fetchLoading) {
    return <FullPageSpinner />;
  }

  return (
    <ContainerBox component="form" autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <AvatarBox>
        <AvatarSection component="label">
          <DropzoneField
            name="avatar"
            errors={errors}
            control={control}
            InputChange={(name, files) => onFileChange(name, files)}
            hidden={true}
            onDropAccepted={onDropAccepted}
          />
          <StyledAvatar className="avatar" src={watch('avatar')?.preview || `${user?.avatarFileUrl}`} />
          {AvatarIsLoading ? (
            <CircularProgress sx={{ position: 'absolute' }} size={'192px'} thickness={2} />
          ) : undefined}
          <Overlay className="overlay">
            <Iconify icon="material-symbols:add-a-photo" width={24} height={24} />
            <FormattedMessage id="upload_photo" />
          </Overlay>
        </AvatarSection>
      </AvatarBox>
      <FormBox>
        <Grid container rowSpacing={3} columnSpacing={2} marginBottom={3}>
          <Grid item xs={12} md={12}>
            <CustomInput label="username" name="username" control={control} errors={errors} />
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomInput disabled label="email" name="email" control={control} errors={errors} />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <CustomDatePicker label="dateOfBirth" name="dateOfBirth" control={control} errors={errors} time={false} />
          </Grid> */}
        </Grid>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={userIsLoading}
          sx={{ display: 'block', marginLeft: 'auto' }}
          disabled={!isDirty}
        >
          <FormattedMessage id="update_profile" />
        </LoadingButton>
      </FormBox>
    </ContainerBox>
  );
}
