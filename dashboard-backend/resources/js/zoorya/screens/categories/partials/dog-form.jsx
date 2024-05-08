import React, { useEffect } from "react";
import SubmitLayout from "@/components/SubmitLayout";
import ErrorAlert from "@/components/ErrorAlert";
import { FullPageSpinner } from "@/components/lib";
import { useClient } from "@/context/auth-context";
import { successWithCustomMessage } from "@/utils/notifications";
import { getRouteWithLang } from "@/utils/routesHelpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";
import * as Yup from "yup";
import CustomInput from "@/components/form/components/custom-input";
import DropzoneField from "@/components/form/components/dropzone-fieldV2";
import { FormattedMessage } from "react-intl";
import Dropdown from "../../../components/form/components/dropdown";

export default () => {
    const { id, categoryId } = useParams();

    const client = useClient();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const route = getRouteWithLang(`/${config.url}`);

    const schema = Yup.object().shape({
        name: Yup.string().required("field_is_required"),
        color: Yup.string().required("field_is_required"),
        weight: Yup.string().required("field_is_required"),
        height: Yup.string().required("field_is_required"),
        age: Yup.string().required("field_is_required"),
        gender: Yup.object().required("field_is_required").typeError("field_is_required"),
        image: Yup.mixed().nullable(),
    });

    const { data, isLoading: fetchLoading } = useQuery({
        queryKey: `${config.queryClient.single}_${id}`,
        queryFn: () => client(`animals/${id}`).then((data) => data.data),
        enabled: id !== undefined,
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
        setError,
        clearErrors,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
        },
    });

    const { mutate, isError, isLoading, error } = useMutation(
        (data) =>
            client(id ? `dogs/${id}` : 'dogs', {
                method: "POST",
                data: data,
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

    useEffect(() => {
        if (!data) return;
        reset({ ...data.resource, image: data.resource?.path })
    }, [data])

    const onSubmitForm = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("age", data.age);
        formData.append("gender", data.gender.value);
        formData.append("color", data.color);
        formData.append("weight", data.weight);
        formData.append("height", data.height);
        formData.append("image", data.image?.[0]);
        formData.append("categoryId", categoryId);
        mutate(formData)
    };

    if (fetchLoading) {
        return <FullPageSpinner />;
    }

    return (
        <Paper sx={{ paddingX: 2, paddingBottom: 1 }} elevation={3}>
            <FormProvider setError={setError} clearErrors={clearErrors} setValue={setValue} control={control} errors={errors}>
                <form
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit(onSubmitForm)}
                >
                    <Stack spacing={3}>
                        <ErrorAlert isError={isError} errors={error} />
                        <Typography variant="h3" >
                            <FormattedMessage id="enter_your_dog" />
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <Stack gap={2}>
                                    <CustomInput label="name" name="name" control={control} errors={errors} />
                                    <CustomInput label="color" name="color" control={control} errors={errors} />
                                    <CustomInput label="weight" name="weight" type="number" control={control} errors={errors} />
                                    <CustomInput label="height" name="height" type="number" control={control} errors={errors} />
                                    <CustomInput label="age" name="age" type="number" control={control} errors={errors} />
                                    <Dropdown title="gender" name="gender" optionUrl="genders" optionLabel="name" />
                                </Stack>
                            </Grid>
                            <Grid item xs={6} sx={{ paddingInlineStart: 1 }}>
                                <DropzoneField name="image" control={control} errors={errors} />
                            </Grid>
                        </Grid>
                    </Stack>
                    <SubmitLayout
                        isLoading={isLoading}
                        isDisabled={!isDirty}
                        label={id !== undefined ? "update" : "save"}
                        cancelAction={() => navigate(-1)}
                    />
                </form>
            </FormProvider>
        </Paper>
    );
};
