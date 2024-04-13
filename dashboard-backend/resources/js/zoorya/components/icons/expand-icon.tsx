import React from "react";
import useLang from "../../hooks/useLang"
import Iconify from "../Iconify"
import { SxProps } from "@mui/material";

const ExpandedIcon = ({expanded, sx}:{expanded:boolean, sx?:SxProps}) => {
    const {lang} = useLang();

    if(expanded) return <Iconify icon="oui:arrow-down" sx={sx} />
    
    return (
        <>
            {
                lang === 'ar' ?
                <Iconify icon="oui:arrow-left" sx={sx} /> :
                <Iconify icon="oui:arrow-right" sx={sx} />
            }
        </>
    );
}

export default ExpandedIcon;