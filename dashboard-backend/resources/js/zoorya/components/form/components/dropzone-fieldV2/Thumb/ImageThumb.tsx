import React from "react";
import { Box, styled } from "@mui/material";
import {ThumbImgProps} from './Types';

const ThumbImg = styled(Box)(() => ({
  display: 'block',
  width: 'auto',
  height: '100%',
}))

export default function ImageThumb({src , ...rest}:ThumbImgProps){
  return <ThumbImg component='img' src={src} {...rest}/>
}