import React from "react"
import SubmitLayout from '@/components/SubmitLayout';
import ErrorAlert from "@/components/ErrorAlert";
import { FullPageSpinner } from "@/components/lib";
import { useClient } from "@/context/auth-context";
import { successWithCustomMessage } from "@/utils/notifications";
import { getRouteWithLang } from "@/utils/routesHelpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import config from '../config';
import * as Yup from "yup";
import CustomInput from '@/components/form/components/custom-input';
import DropzoneField from '@/components/form/components/dropzone-fieldV2';

export default function Form() {
  const { id } = useParams();
  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const route = getRouteWithLang(`/${config.url}`);

  const schema = Yup.object().shape({
    order: Yup.number().typeError('field_is_required').required('field_is_required'),
    image: Yup.mixed().required('field_is_required'),
  });

  const { isLoading: fetchLoading, data: slider } = useQuery({
    queryKey: `${config.queryClient.single}_${id}`,
    queryFn: () => client(`${config.url}/${id}`).then((data) => data.data),
    enabled: id !== undefined,
  });

  const { control, handleSubmit, setValue, reset, formState: { errors, isDirty }, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '' },
  });

  React.useEffect(() => {
    if (!slider) return;
    if (!id) return;
    reset({ ...slider, image: slider.path });
  }, [slider]);

  const { mutate, isError, isLoading, error } = useMutation(
    (data) =>
      client(id ? `${config.url}/${id}` : config.url, {
        method: 'POST',
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(config.queryClient.list);
        navigate(`${route}`);
        reset();
        successWithCustomMessage("updated_success_msg");
      },
    }
  );

  const onSubmitForm = ({ order, image }) => {
    const formData = new FormData()
    formData.append('order', order);
    formData.append('image', image?.[0])
    mutate(formData)
  };

  if (fetchLoading) return <FullPageSpinner />

  return (
    <FormProvider setError={setError} clearErrors={clearErrors} setValue={setValue}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Stack spacing={3}>
          <ErrorAlert isError={isError} errors={error} />
          <Grid item xs={12}>
            <CustomInput label="order" name="order" control={control} errors={errors} type="number" />
          </Grid>
          <Grid item xs={12}>
            <DropzoneField name="image" control={control} errors={errors} />
          </Grid>
        </Stack>
        <SubmitLayout isLoading={isLoading} isDisabled={!isDirty} label={id !== undefined ? 'update' : 'save'} cancelAction={() => navigate(-1)} />
      </form >
    </FormProvider >

  );
}
