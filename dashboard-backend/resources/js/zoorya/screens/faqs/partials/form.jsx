import React from "react"
import SubmitLayout from '@/components/SubmitLayout';
import ErrorAlert from "@/components/ErrorAlert";
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
import CustomTextarea from '@/components/form/components/custom-textarea';
import CustomInput from '@/components/form/components/custom-input';

export default function Form() {
  const { id } = useParams();
  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const route = getRouteWithLang(`/${config.url}`);

  const schema = Yup.object().shape({
    titleAr: Yup.string().required('field_is_required'),
    titleEn: Yup.string().required('field_is_required'),
    descriptionAr: Yup.string().required('field_is_required'),
    descriptionEn: Yup.string().required('field_is_required'),
  });

  const { isLoading: fetchLoading, data: faq } = useQuery({
    queryKey: `${config.queryClient.single}_${id}`,
    queryFn: () => client(`${config.url}/${id}`).then((data) => data.data),
    enabled: id !== undefined,
  });

  const { control, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '' },
  });

  React.useEffect(() => {
    if (!faq) return;
    if (!id) return;

    reset({ ...faq });
  }, [faq]);

  const { mutate, isError, isLoading, error } = useMutation(
    (data) =>
      client(id ? `${config.url}/${id}` : config.url, {
        method: id ? 'PUT' : 'POST',
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

  const onSubmitForm = (data) => mutate(data);

  if (fetchLoading) {
    return <FullPageSpinner />
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        <ErrorAlert isError={isError} errors={error} />
        <Grid container>
          {
            ['Ar', 'En'].map((lang) =>
              <React.Fragment key={lang}>
                <Grid item xs={12} sx={{ padding: '10px' }} >
                  <CustomInput label={`title${lang}`} name={`title${lang}`} control={control} errors={errors} />
                </Grid>
                <Grid item xs={12} sx={{ padding: '10px' }} >
                  <CustomTextarea label={`description${lang}`} name={`description${lang}`} control={control} errors={errors} />
                </Grid>
              </React.Fragment>
            )
          }
        </Grid>
      </Stack>
      <SubmitLayout isLoading={isLoading} isDisabled={!isDirty} label={id !== undefined ? 'update' : 'save'} cancelAction={() => navigate(-1)} />
    </form >
  );
}
