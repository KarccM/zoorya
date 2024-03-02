import React from "react"
import CustomInput from "@/components/form/components/custom-input";
import DropzoneField from "@/components/form/components/dropzone-field";
import SubmitLayout from '@/components/SubmitLayout';
import ErrorAlert from "@/components/ErrorAlert";
import RichSection from '@/components/form/components/RichText/index';
import { FullPageSpinner } from "@/components/lib";
import { useClient } from "@/context/auth-context";
import { successWithCustomMessage } from "@/utils/notifications";
import { getRouteWithLang } from "@/utils/routesHelpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import config from '../config';
import * as Yup from "yup";
import CustomTextarea from "@/components/form/components/custom-textarea";
import prepare from "./prepare-request";
import AsyncSelect from '@/components/form/components/async-select/index';

export default function Form() {
  const { id } = useParams();
  const client = useClient('multipart/form-data');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const route = getRouteWithLang("/our-services");
  const [backendErrors, setBackendErrors] = React.useState([]);

  const schema = Yup.object().shape({
    titleAr: Yup.string().required('field_is_required'),
    contentAr: Yup.string().required('field_is_required'),
    titleEn: Yup.string().required('field_is_required'),
    contentEn: Yup.string().required('field_is_required'),
    image: Yup.mixed().nullable(),
    contentType: Yup.object().typeError('field_is_required'),
  });

  const { isLoading: fetchLoading, data: service } = useQuery({
    queryKey: `${config.queryClient.single}_${id}`,
    queryFn: () => client(`${config.url}/${id}`).then((data) => data.data),
    enabled: id !== undefined,
  });

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titleAr: '',
      titleEn: '',
      titleFr: '',
      contentAr: '',
      contentEn: '',
      contentFr: '',
      externalImage: '',
      internalImage: '',
      metaDataDescriptionAr: '',
      metaDataKeywordAr: '',
      metaDataDescriptionEn: '',
      metaDataKeywordEn: '',
      metaDataDescriptionFr: '',
      metaDataKeywordFr: '',
      contentType: ''
    },
  });

  const onFileChange = async (name, files) => {
    setValue(name, files, { shouldDirty: true });
    if (files?.file) {
      await trigger(["image"]);
    }
  };

  React.useEffect(() => {
    if (service && id !== undefined) {
      let ar = service.translations.find(_ => _.locale === 'ar')
      let en = service.translations.find(_ => _.locale === 'en')
      let fr = service.translations.find(_ => _.locale === 'fr')
      reset({
        ...service,
        titleAr: ar.title,
        contentAr: ar.content,
        metaDataKeywordAr: ar?.metaDataKeyword,
        metaDataDescriptionAr: ar?.metaDataDescription,
        titleEn: en.title,
        contentEn: en.content,
        metaDataKeywordEn: en?.metaDataKeyword,
        metaDataDescriptionEn: en?.metaDataDescription,
        titleFr: fr?.title,
        contentFr: fr?.content,
        metaDataKeywordFr: fr?.metaDataKeyword,
        metaDataDescriptionFr: fr?.metaDataDescription,
      });
    }
  }, [service]);

  const { mutate, isError, isLoading } = useMutation(
    (data) =>
      client(`${id ? `${config.url}/${id}` : `${config.url}`} `, {
        method: id ? 'PATCH' : 'POST',
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(config.queryClient.list);
        navigate(`${route}`);
        reset();
        if (id) successWithCustomMessage("updated_success_msg");
        else successWithCustomMessage("added_success_msg");
      },
      onError: (error) => {
        setBackendErrors(error.response.data.errors);
      },
    }
  );

  const onSubmitForm = (data) => {
    let formData = prepare(data);
    formData.append('published', false)
    mutate(formData);
  };

  if (fetchLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Stack spacing={3}>
          <ErrorAlert isError={isError} errors={backendErrors} />
          <Grid container spacing={2}>
            {
              ['Ar', 'En', 'Fr'].map((lang) =>
                <Grid item xs={12} key={lang}>
                  <Stack gap={2}>
                    <CustomInput label={`title${lang}`} name={`title${lang}`} control={control} errors={errors} />
                    <RichSection label={`content${lang}`} name={`content${lang}`} control={control} errors={errors} />
                    <CustomInput label={`metaDataKeyword${lang}`} name={`metaDataKeyword${lang}`} control={control} error={errors} />
                    <CustomTextarea label={`metaDataDescription${lang}`} name={`metaDataDescription${lang}`} control={control} errors={errors} />
                  </Stack>
                </Grid>
              )
            }
          </Grid>

          <AsyncSelect
            name='contentType'
            title='contentType'
            optionUrl={'options/session-content-types'}
            errors={errors}
            control={control}
            publicClient={true}

          />

          <DropzoneField
            name="externalImage"
            label="external_image"
            control={control}
            InputChange={(name, files) => onFileChange(name, files)}
            errors={errors}
            editValue={service?.externalImageUrl}
          />

        </Stack>
        <SubmitLayout isLoading={isLoading} isDisabled={!isDirty} label={id !== undefined ? 'update' : 'save'} cancelAction={() => navigate(-1)} />
      </form >
    </>
  );
}
