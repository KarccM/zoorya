import { Container, Paper, Stack, Typography } from "@mui/material";
import Page from "@/components/Page";
import React from "react";
import { FormattedMessage } from "react-intl";
import UserForm from "../partials/user-form";
import Breadcrumbs from "@/components/breadcrumbs";

export default function AddUsers() {
    return (
        <Page title="User">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        <FormattedMessage id="create_new_user" />
                    </Typography>
                </Stack>
                <Breadcrumbs />
                <UserForm />
            </Container>
        </Page>
    );
}
