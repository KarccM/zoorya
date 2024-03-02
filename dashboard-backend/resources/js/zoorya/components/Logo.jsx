import * as React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import { getRouteWithLang } from "../utils/routesHelpers";
import svgLogo from '#/logo.svg';

// ----------------------------------------------------------------------

Logo.propTypes = {
    disabledLink: PropTypes.bool,
    sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
    const logo = (
        <Box
            sx={{
                width: 100,
                height: 60,
                ...sx,
            }}
        >
            <img
                src={svgLogo}
                alt={'dashboard-logo'}
            />
        </Box>
    );

    if (disabledLink) {
        return <>{logo}</>;
    }

    return <RouterLink to={getRouteWithLang("/")}>{logo}</RouterLink>;
}
