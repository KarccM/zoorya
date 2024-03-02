import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import useQueryParams from "@/hooks/useQueryParams";
import CustomInput from "@/components/form/components/custom-input";
import Iconify from "@/components/Iconify";

// ----------------------------------------------------------------------

export default function FiltersForm() {
    const {
        setQueryParams,
        removeArrayOfQueryParams,
        getQueryParams,
        removeQueryParams,
    } = useQueryParams();


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const Schema = Yup.object().shape({});

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            search: "",
            name: "",
            email: "",
            phoneNumber: "",
            isActive: "",
        },
    });
    React.useEffect(() => {
        if (
            getQueryParams("search") ||
            getQueryParams("email") ||
            getQueryParams("name") ||
            getQueryParams("phoneNumber") ||
            getQueryParams("isActive")
        ) {
            reset({
                search: getQueryParams("search"),
                name: getQueryParams("name"),
                isActive: getTranslation(getQueryParams("isActive")),
                email: getQueryParams("email"),
                phoneNumber: getQueryParams("phoneNumber"),
            });
            handleOpen();
        }
    }, []);
    const onSubmitForm = ({ search, phoneNumber, email, isActive, name }) => {
        if (getValues("search")) {
            setQueryParams("search", search);
        } else {
            removeQueryParams("search");
        }

        if (getValues("name")) {
            setQueryParams("name", name);
        } else {
            removeQueryParams("name");
        }

        if (getValues("email")) {
            setQueryParams("email", email);
        } else {
            removeQueryParams("email");
        }

        if (getValues("phoneNumber")) {
            setQueryParams("phoneNumber", phoneNumber);
        } else {
            removeQueryParams("phoneNumber");
        }
    };

    const clearFilter = () => {
        reset({
            search: "",
            name: "",
            phoneNumber: "",
            isActive: "",
            email: "",
        });
        removeArrayOfQueryParams([
            "search",
            "phoneNumber",
            "isActive",
            "email",
            "name",
        ]);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Typography variant="h4">
                    <FormattedMessage id="filters" />
                </Typography>
                <Tooltip title="Filter list">
                    <IconButton onClick={handleOpen}>
                        <Iconify icon="ic:round-filter-list" />
                    </IconButton>
                </Tooltip>
            </Stack>
            {open && (
                <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
                    <Grid container rowSpacing={3} columnSpacing={2}>
                        <Grid item xs={12}>
                            <CustomInput label="search" name="search" control={control} errors={errors} />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput label="email" name="email" control={control} errors={errors} />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput label="name" name="name" control={control} errors={errors} />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput label="phone_number" name="phoneNumber" control={control} errors={errors} />
                        </Grid>
                    </Grid>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
                        <LoadingButton size="large" variant="outlined" onClick={clearFilter} sx={{ mr: 2 }}>
                            <FormattedMessage id="clear" />
                        </LoadingButton>
                        <LoadingButton size="large" type="submit" variant="outlined">
                            <FormattedMessage id="apply_filter" />
                        </LoadingButton>
                    </Stack>
                </form>
            )}
        </>
    );
}
