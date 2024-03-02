import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";
import { Translate } from "../hooks/useTranslation";

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = "", meta, ...other }, ref) => {
    let translatedTitle = Translate(title);
    return (
        <>
            <Helmet>
                <title>
                    {`${translatedTitle ?? title}`}
                </title>
                <link rel="icon" type="image/png"
                    //  href={fav} 
                    sizes="16x16" />
                {meta}
            </Helmet>

            <Box ref={ref} {...other}>
                {children}
            </Box>
        </>
    );
});

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    meta: PropTypes.node,
};

export default Page;
