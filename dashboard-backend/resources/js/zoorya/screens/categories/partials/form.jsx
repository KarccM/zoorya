import React from "react"
import SubmitLayout from '@/components/SubmitLayout';
import ErrorAlert from "@/components/ErrorAlert";
import { FullPageSpinner } from "@/components/lib";
import { useClient } from "@/context/auth-context";
import { successWithCustomMessage } from "@/utils/notifications";
import { getRouteWithLang } from "@/utils/routesHelpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import config from '../config';
import * as Yup from "yup";
import CustomInput from '@/components/form/components/custom-input';

export default function Form() {
  const { id, parentId } = useParams();

  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const route = getRouteWithLang(`/${config.url}`);

  const schema = Yup.object().shape({
    name: Yup.string().required('name_is_required'),
  });

  const { isLoading: fetchLoading, data: category } = useQuery({
    queryKey: `${config.queryClient.single}_${id}`,
    queryFn: () => client(`${config.url}/${id}`).then((data) => data.data),
    enabled: id !== undefined,
  });

  const { control, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "" },
  });

  React.useEffect(() => {
    if (!category) return;
    if (!id) return;

    reset({ ...category });
  }, [category]);

  const { mutate, isError, isLoading, error } = useMutation(
    (data) =>
      client(id ? `${config.url}/${id}` : config.url, {
        method: id ? 'PUT' : 'POST',
        data: {...data, parentId},
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
        <CustomInput label="name" name="name" control={control} errors={errors} />
      </Stack>
      <SubmitLayout isLoading={isLoading} isDisabled={!isDirty} label={id !== undefined ? 'update' : 'save'} cancelAction={() => navigate(-1)} />
    </form >
  );
}