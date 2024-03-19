import CustomInput from "@/components/form/components/custom-input";
import DropzoneField from "@/components/form/components/dropzone-field";
import InputPassword from "@/components/form/components/input-password";
import { FullPageSpinner } from "@/components/lib";
import { useClient } from "@/context/auth-context";
import { successWithCustomMessage } from "@/utils/notifications";
import { getRouteWithLang } from "@/utils/routesHelpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import CustomCheckbox from "@/components/form/components/custom-checkbox";
import SubmitLayout from '@/components/SubmitLayout';
import ErrorAlert from "@/components/ErrorAlert";
import CustomDatePicker from '@/components/form/components/custom-date-picker/index';

export default function UserForm() {
    const { id } = useParams();

    const client = useClient('multipart/form-data');

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const usersRoute = getRouteWithLang("/users");

    const UserSchema = Yup.object().shape({
        email: Yup.string().email("valid_email_address").required("field_is_required"),
        password: id ? "" : Yup.string().typeError("field_is_required").required('field_is_required').matches(/^(?=.*[A-Z])(?=.*[a-z])?(?=.*\d)(?=.*[~@$!%*#?&()\-_=+\[\]{};:'"\\/<>|`,.])?[A-Za-z\d~@$!%*#?&()\-_=+\[\]{};:'"\\/<>|`,.]{8,}$/, "password_must_contain_8_Characters_one_capital_character_and_one_number_at_least"),
        phoneNumber: Yup.string().min(10, "phone_number_must_be_at_least_10_characters").max(12, "phone_number_must_be_at_most_12_characters").required("field_is_required"),
        avatar: Yup.mixed().nullable(),
        active: Yup.boolean().nullable(),
        username: Yup.string().required('field_is_required'),
        dateOfBirth: Yup.date().required('field_is_required').typeError('enter_valid_date'),
    });

    const { isLoading: fetchLoading, data: user } = useQuery({
        queryKey: `user_${id}`,
        queryFn: () => client(`users/${id}`).then((data) => data.data),
        enabled: id !== undefined,
    });

    const {
        control,
        handleSubmit,
        reset,
        trigger,
        setValue,
        formState: { errors, isDirty },
    } = useForm({
        resolver: yupResolver(UserSchema),
        defaultValues: {
            active: null,
            phoneNumber: "",
            password: "",
            email: "",
            avatar: "",
            role: "",
            username: "",
            gender: "",
        },
    });

    const onFileChange = async (name, files) => {
        setValue(name, files, { shouldDirty: true });
        if (files?.file) {
            await trigger(["avatar"]);
        }
    };

    useEffect(() => {
        if (!user || !id) return;
        reset({ ...user });
    }, [user]);

    const { mutate, isError, isLoading, error } = useMutation(
        (data) => client(`${id ? `users/${id}` : 'users'} `, { method: 'POST', data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("users");
                navigate(`${usersRoute}`);
                reset();
                id ? successWithCustomMessage("updated_success_msg") : successWithCustomMessage("added_success_msg");
            },
        }
    );

    const onSubmitForm = ({ avatar, password, username, active, phoneNumber, dateOfBirth, email }) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("active", active);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("dateOfBirth", dateOfBirth);
        !avatar ? formData.append("avatar", null) : formData.append("avatar", avatar);
        password != null && formData.append("password", password);
        // role && formData.append("role", role.id);
        mutate(formData);
    };

    if (fetchLoading) return <FullPageSpinner />

    return (
        <Paper sx={{ padding: 2 }}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
                <ErrorAlert isError={isError} errors={error} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomCheckbox label="active" name="active" control={control} />
                    </Grid>

                    <Grid item xs={12}>
                        <CustomInput label="username" name="username" control={control} errors={errors} />
                    </Grid>

                    <Grid item xs={9}>
                        <CustomInput label="email" name="email" control={control} errors={errors} />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomDatePicker label="dateOfBirth" name="dateOfBirth" control={control} errors={errors} time={false} />
                    </Grid>

                    <Grid item xs={12}>
                        <CustomInput label="phone_number" name="phoneNumber" control={control} errors={errors} />
                    </Grid>

                    {!id &&
                        <Grid item xs={12}>
                            <InputPassword label="password" name="password" control={control} errors={errors} />
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <DropzoneField name="avatar" control={control} InputChange={(name, files) => onFileChange(name, files)} errors={errors} editValue={user?.avatarFileUrl} />
                    </Grid>
                </Grid>
                <SubmitLayout isLoading={isLoading} isDisabled={!isDirty} label={id !== undefined ? 'update' : 'save'} cancelAction={() => navigate(`${usersRoute}`)} />
            </form>
        </Paper>

    );
}
