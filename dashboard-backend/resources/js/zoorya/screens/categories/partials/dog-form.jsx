import React from "react";
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
        image: Yup.mixed().nullable(),
    });

    const {isLoading: fetchLoading} = useQuery({
        queryKey: `${config.queryClient.single}_${id}`,
        queryFn: () => client(`${config.url}/${id}`).then((data) => reset(...data.data)),
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
                method: id ? "PUT" : "POST",
                data: { ...data, categoryId },
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
        return <FullPageSpinner />;
    }

    return (
        <Paper sx={{paddingX:2, paddingBottom:1}} elevation={3}>
            <FormProvider setError={setError} clearErrors={clearErrors} setValue={setValue}>
                <form
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit(onSubmitForm)}
                >
                    <Stack spacing={3}>
                        <ErrorAlert isError={isError} errors={error} />
                        <Typography variant="h3" >
                            <FormattedMessage id="enter_your_dog"/>
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <Stack gap={2}>
                                    <CustomInput
                                        label="name"
                                        name="name"
                                        control={control}
                                        errors={errors}
                                    />
                                    <CustomInput
                                        label="color"
                                        name="color"
                                        control={control}
                                        errors={errors}
                                    />
                                    <CustomInput
                                        label="weight"
                                        name="weight"
                                        type="number"
                                        control={control}
                                        errors={errors}
                                    />
                                    <CustomInput
                                        label="height"
                                        name="height"
                                        type="number"
                                        control={control}
                                        errors={errors}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={6} sx={{paddingInlineStart:1}}>
                                <DropzoneField
                                    name="image"
                                    control={control}
                                    errors={errors}
                                />
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