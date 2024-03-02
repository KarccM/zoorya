import { Container, Stack, Typography } from "@mui/material";
import Page from "@/components/Page";
import React from "react";
import { FormattedMessage } from "react-intl";
import Form from "../Partials/Form";
import Breadcrumbs from "@/components/breadcrumbs";

export default function Add() {
    return (
        <Page title="Role">
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h4" gutterBottom>
                        <FormattedMessage id="create_new_role" />
                    </Typography>
                </Stack>
                <Breadcrumbs />
                <Form />
            </Container>
        </Page>
    );
}
