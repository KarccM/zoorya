import CustomInput from "@/components/form/components/custom-input";
import InputPassword from "@/components/form/components/input-password";
import { yupResolver } from "@hookform/resolvers/yup"; // material
import { LoadingButton } from "@mui/lab";
import { Alert, Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { useAuth } from '@/context/auth-context';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const { login } = useAuth();

    const { mutate, isLoading, error, isError } = useMutation((data) => axios({
        url: `${window.origin}/api/login`,
        method: 'POST',
        data,
    }), { onSuccess: (response) => login(response.data) });


    const LoginSchema = Yup.object().shape({
        username: Yup.string().required("field_is_required"),
        password: Yup.string().required("field_is_required"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmitForm = (data) => {
        mutate(data);
    };

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Stack spacing={3}>
                {isError && <Alert severity="error">{error?.response?.data?.message}</Alert>}
                <CustomInput label="username" name="username" control={control} errors={errors} />
                <InputPassword label="password" name="password" control={control} errors={errors} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}></Stack>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
                <FormattedMessage id="login" />
            </LoadingButton>
        </form>
    );
}
