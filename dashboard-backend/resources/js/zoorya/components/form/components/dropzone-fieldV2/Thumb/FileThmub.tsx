import React from "react";
import { Box, styled } from "@mui/material";
const ThumbInner = styled(Box)(() => ({
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  position: 'relative',
}))

export default function FileThumb({...rest}){
  return (
      <ThumbInner {...rest}>
        FILE
      </ThumbInner>
  )
}