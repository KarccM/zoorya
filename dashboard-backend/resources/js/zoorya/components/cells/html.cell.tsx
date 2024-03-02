import React from "react";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

type Props = {
  title:string,
  content:string,
}

export default function HtmlCell({title,content}:Props) {
  return ( 
    <>
      <Typography fontWeight='800'>
        <FormattedMessage id={title} />
      </Typography>
      <Typography sx={{color: "grey"}}>
        <div dangerouslySetInnerHTML={{ __html:content }} />
      </Typography>
  </>
)
}