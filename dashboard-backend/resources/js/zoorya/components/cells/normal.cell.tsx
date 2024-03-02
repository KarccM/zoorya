import React from "react";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

type Props = {
  title:string,
  content:string,
}

export default function NormalCell({title,content}:Props) {
  return ( 
    <>
      <Typography fontWeight='800'>
        <FormattedMessage id={title} />
      </Typography>
      <Typography sx={{color: "grey"}}>
        {content}
      </Typography>
  </>
)
}