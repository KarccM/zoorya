import React from "react";
import { Box, styled } from "@mui/material";
import { DeleteThumbButton, DownloadThumbButton, EditThumbButton, PreviewThumbButton } from "./ThumbActions";
import { FileThumb, ThumbAction } from "./Types";

const AbstructThumb = styled(Box)(() => ({
    display: 'inline-flex',
    borderRadius: 4,
    border: '1px solid grey',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative',
}))

type ThumbProps = {
  children: React.ReactNode,
  file:FileThumb,
  index:number,
  deleteAction:ThumbAction,
  downloadAction:ThumbAction,
  editAction:ThumbAction,
  previewAction:ThumbAction,
}

export default function Thumb({children, editAction, deleteAction, previewAction, downloadAction, file, index} : ThumbProps){
  return (
    <AbstructThumb>
      <DeleteThumbButton action={() => deleteAction(file,index)}/>
      <DownloadThumbButton  action={() => downloadAction(file,index)}/>
      <PreviewThumbButton action={() => previewAction(file,index)}/>
      <EditThumbButton action={() => editAction(file,index)}/>
      {children}
    </AbstructThumb>
  )
};