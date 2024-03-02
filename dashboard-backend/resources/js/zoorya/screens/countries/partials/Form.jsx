import React from "react"
import CustomInput from "@/components/form/components/custom-input";
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

export default function Form() {
  const { id } = useParams();
  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const route = getRouteWithLang("/countries");
  const [backendErrors, setBackendErrors] = React.useState([]);

  const schema = Yup.object().shape({
    nameAr: Yup.string().required('field_is_required'),
    nameEn: Yup.string().required('field_is_required'),
    iso2: Yup.string().required('field_is_required').min(2, 'exact_2').max(2, 'exact_2'),
    phoneNumberCode: Yup.string().required('field_is_required').matches(/^\+\d{3}$/, 'invalid_phone_number_code'),
    image: Yup.mixed().nullable(),
  });

  const { isLoading: fetchLoading, data: counrty } = useQuery({
    queryKey: `${config.queryClient.single}_${id}`,
    queryFn: () => client(`${config.url}/${id}`).then((data) => data.data),
    enabled: id !== undefined,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nameAr: '',
      nameEn: '',
      nameFr: '',
      iso2: '',
      phoneNumberCode: '',
    },
  });

  React.useEffect(() => {
    if (counrty && id !== undefined) {
      let arCounrty = counrty.translations.find(_ => _.locale === 'ar')
      let enCounrty = counrty.translations.find(_ => _.locale === 'en')
      let frCounrty = counrty.translations.find(_ => _.locale === 'fr')
      reset({
        ...counrty,
        nameAr: arCounrty.name,
        nameEn: enCounrty.name,
        nameFr: frCounrty?.name,

      });
    }
  }, [counrty]);

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


  const onSubmitForm = ({ nameAr, nameEn, nameFr, iso2, phoneNumberCode }) => {
    let translations = [
      { locale: 'ar', name: nameAr },
      { locale: 'en', name: nameEn },
    ];
    if (nameFr)
      translations.push({ locale: 'fr', name: nameFr });
    mutate({
      iso2,
      phoneNumberCode,
      active: true,
      translations,
    });
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
                <Grid item xs={6} key={lang}>
                  <Stack gap={2}>
                    <CustomInput label={`name${lang}`} name={`name${lang}`} control={control} errors={errors} />
                  </Stack>
                </Grid>
              )
            }
            <Grid item xs={6}>
              <CustomInput label='iso2' name='iso2' control={control} errors={errors} />
            </Grid>
            <Grid item xs={6}>
              <CustomInput label='phoneNumberCode' name='phoneNumberCode' control={control} errors={errors} />
            </Grid>
          </Grid>
        </Stack>
        <SubmitLayout isLoading={isLoading} isDisabled={!isDirty} label={id !== undefined ? 'update' : 'save'} cancelAction={() => navigate(-1)} />
      </form >
    </>
  );
}
