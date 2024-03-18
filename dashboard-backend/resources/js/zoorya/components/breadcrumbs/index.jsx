import React from "react";
import { styled, Breadcrumbs, Box, Stack, Typography } from '@mui/material';
import { getRouteWithLang } from "../../utils/routesHelpers";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import usePageMetadata from '@/hooks/usePageMetadata';

const Dot = styled("span")(() => ({
    height: "0.3rem",
    width: "0.3rem",
    backgroundColor: "#333",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: ".3rem",
    marginLeft: ".3rem",
}));

const StyledBreadcrumbs = styled(Breadcrumbs)(() => ({
    fontWeight: "700",
    color: "white",
    "& .last": {
        fontWeight: "300",
        color: "grey",
        PointerEvent: "none",
    },
    "& .last:hover": {
        textDecoration: "none",
        cursor: "default",
    },
}));

const StyledBox = styled(Box)(({ theme }) => ({
    textDecoration: "none",
    color: theme?.palette?.mode == "dark" ? "white" : theme?.palette?.grey[700],
    fontSize: "1rem",
    "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
    },
}));


export default () => {
    const { title, crumbs } = usePageMetadata()

    return (
        <Stack>
            <Typography variant="h4">
                <FormattedMessage id={title} />
            </Typography>
            <StyledBreadcrumbs aria-label="Breadcrumbs " separator={<Dot />}>
                {crumbs.map((crumb, index) => {
                    return index !== crumbs.length - 1 ? (
                        <StyledBox key={index} component={Link} to={getRouteWithLang(crumb.props.to)}>
                            <FormattedMessage id={crumb.props.children} />
                        </StyledBox>
                    ) : (
                        <StyledBox key={index} component={"span"} className="last">
                            <FormattedMessage id={crumb.props.children} />
                        </StyledBox>
                    );
                })}
            </StyledBreadcrumbs>
        </Stack>
    );
};
