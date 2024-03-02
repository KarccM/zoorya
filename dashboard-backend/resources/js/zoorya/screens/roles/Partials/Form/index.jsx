import CustomInput from "@/components/form/components/custom-input";
import { FullPageSpinner } from "@/components/lib";
import { useClient } from "@/context/auth-context";
import { getErrorsFromResponse } from "@/utils/fromHelper";
import { successWithCustomMessage } from "@/utils/notifications";
import { getRouteWithLang } from "@/utils/routesHelpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Container, FormControlLabel, Grid, Stack, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import SubmitLayout from '@/components/SubmitLayout';
import ErrorAlert from "@/components/ErrorAlert";

export default function Form() {
    const { id } = useParams();
    const client = useClient();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const rolesRoute = getRouteWithLang("/roles");
    const [backendErrors, setBackendErrors] = React.useState([]);
    const theme = useTheme()

    const Schema = Yup.object().shape({
        name: Yup.string().required("field_is_required"),
        permissions: Yup.array().required("field_is_required"),
    });

    const { isLoading: fetchLoading, data: role } = useQuery({
        queryKey: `role_${id}`,
        queryFn: () => client(`roles/${id}`).then((data) => data.data),
        enabled: id !== undefined,
    });

    const { isLoading: permissionFetchLoading, data: permissionSections } = useQuery({
        queryKey: 'permissions',
        queryFn: () => client(`roles/permissions`).then((data) => data.data),
    });

    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            name: "",
            permissions: [],
        },
    });

    useEffect(() => {
        if (role && id !== undefined) {
            reset({
                ...role,
            })
        }
    }, [role]);

    const { mutate, isError, isLoading } = useMutation(
        data =>
            client(`${id ? `roles/${id}` : 'roles'} `, {
                method: id ? 'PATCH' : 'POST',
                data,
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("roles");
                navigate(`${rolesRoute}`);
                reset();
                if (id) successWithCustomMessage("updated_success_msg");
                else successWithCustomMessage("added_success_msg");
            },
            onError: (error) => {
                let errors = getErrorsFromResponse(error);
                setBackendErrors(error.response.data.errors);

            },
        }
    );

    const onSubmitForm = ({ permissions, name }) => {
        mutate({ name, permissions: permissions.map(permission => permission) });
    };

    if (fetchLoading || permissionFetchLoading) {
        return <FullPageSpinner />;
    }

    const nameAppreviator = (permissionName) => {
        if (permissionName.toLowerCase().includes('show'))
            return 'Show';
        if (permissionName.toLowerCase().includes('create'))
            return 'Create';
        if (permissionName.toLowerCase().includes('update'))
            return 'Update';
        if (permissionName.toLowerCase().includes('delete'))
            return 'Delete';
        return permissionName.charAt(0).toUpperCase() + permissionName.slice(1);
    }

    return (
        <>
            <Container sx={{ background: theme.palette.background.paper, paddingY: 6, borderRadius: 1 }}>
                <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
                    <Stack spacing={1}>
                        <ErrorAlert isError={isError} errors={backendErrors} />
                        <CustomInput name="name" label="name" errors={errors} control={control} />
                        {permissionSections?.length > 0 && permissionSections.map(({ section, permissions }) =>
                            <Grid container key={section} alignItems='center' borderBottom='1px solid #d9d9d9'>
                                <Grid item xs={4} >
                                    {section}
                                </Grid>
                                <Grid item xs={8} >
                                    <Stack justifyContent='start' flexDirection='row'>
                                        {permissions.sort((a, b) => a.name.localeCompare(b.name)).map(({ name, permission }) =>
                                            <FormControlLabel
                                                sx={{ minWidth: '150px' }}
                                                control={
                                                    <Checkbox
                                                        {...register("permissions")}
                                                        value={permission}
                                                        defaultChecked={role?.permissions.includes(permission)}
                                                    />
                                                }
                                                label={nameAppreviator(name)}
                                                key={name}
                                            />
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>

                        )}
                    </Stack>
                    <SubmitLayout
                        isLoading={isLoading}
                        isDisabled={!true}
                        label={id !== undefined ? 'update' : 'save'}
                        cancelAction={() => navigate(-1)}
                    />
                </form>
            </Container>

        </>
    );
}
