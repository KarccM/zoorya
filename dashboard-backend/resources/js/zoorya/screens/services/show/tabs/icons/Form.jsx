import React, { useEffect } from 'react';
import ErrorAlert from '@/components/ErrorAlert';
import DropzoneField from '@/components/form/components/dropzone-field/index';
import SubmitLayout from '@/components/SubmitLayout';
import CustomInput from '@/components/form/components/custom-input';
import { FullPageSpinner } from '@/components/lib';
import { useClient } from '@/context/auth-context';
import { successWithCustomMessage } from '@/utils/notifications';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import config from './config';
import * as Yup from 'yup';

export default function Form({ Id, cancel }) {
  const { id: serviceId } = useParams()
  const client = useClient('multipart/form-data');
  const queryClient = useQueryClient();
  const [backendErrors, setBackendErrors] = React.useState([]);

  const Schema = Yup.object().shape({
    titleAr: Yup.string().required('field_is_required'),
    titleEn: Yup.string().required('field_is_required'),
    file: Yup.mixed().required('field_is_required'),
  });

  const { isLoading: fetchLoading, data: service } = useQuery({
    queryKey: `${config.queryClient.single}_${Id}`,
    queryFn: () => client(`${config.url}/${Id}`).then((data) => data?.data),
    enabled: Id !== undefined,
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      titleAr: '',
      titleEn: '',
      titleFr: '',
      file: ''
    },
  });

  useEffect(() => {
    if (service && Id !== undefined) {
      let ar = service.translations.find(_ => _.locale === 'ar')
      let en = service.translations.find(_ => _.locale === 'en')
      let fr = service.translations.find(_ => _.locale === 'fr')
      reset({
        ...service,
        titleAr: ar?.title,
        titleEn: en?.title,
        titleFr: fr?.title,

      });
    }
  }, [service]);

  const { mutate, isError, isLoading } = useMutation(
    (data) =>
      client(Id ? `${config.url}/${Id}` : `${config.url}`, {
        method: Id ? 'PATCH' : 'POST',
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(config.queryClient.list);
        reset();
        if (Id) successWithCustomMessage('updated_success_msg');
        else successWithCustomMessage('added_success_msg');
        cancel()
      },
      onError: (error) => {
        setBackendErrors(error.response.data.errors);

      },
    }
  );


  const onFileChange = async (name, files) => {
    setValue(name, files, { shouldDirty: true });
    if (files?.file) {
      await trigger(["file"]);
    }
  };

  const onSubmitForm = ({
    titleAr,
    titleEn,
    titleFr,
    file,
  }) => {
    const formData = new FormData();
    !file ? formData.append("file", null) : formData.append("file", file);
    formData.append('translations[0][locale]', "ar")
    formData.append('translations[0][title]', titleAr)
    formData.append('translations[1][locale]', "en")
    formData.append('translations[1][title]', titleEn)
    titleFr && formData.append('translations[2][locale]', "fr")
    titleFr && formData.append('translations[2][title]', titleFr)
    formData.append('ourService', serviceId)
    mutate(formData);
  };

  if (fetchLoading) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Typography variant="h4" marginBottom={2}>
          <FormattedMessage id={config.title} />
        </Typography>
        <Stack spacing={3}>
          <ErrorAlert isError={isError} errors={backendErrors} />
          <Grid container>
            {
              ['titleAr', 'titleEn', 'titleFr'].map((name, idx) =>
                <Grid item xs={6} key={name} sx={{ padding: (idx % 2 == 0) ? '0px 8px 16px 0px' : '0px 0px 16px 8px' }}>
                  <CustomInput label={name} name={name} control={control} errors={errors} />
                </Grid>)
            }
          </Grid>
          <DropzoneField
            name="file"
            control={control}
            InputChange={(name, files) => onFileChange(name, files)}
            errors={errors}
            editValue={service?.fileUrl}
          />
        </Stack>
        <SubmitLayout isLoading={isLoading} isDisabled={!isDirty} label={Id !== undefined ? 'update' : 'save'} cancelAction={cancel} />
      </form>
    </>
  );
}
