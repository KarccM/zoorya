import React from "react"
import { IconButton, styled } from "@mui/material"
import { ThumbButtonProps } from "./Types"

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.direction === 'ltr' ? 2.5 : 'unset',
  left: theme.direction === 'rtl' ? 2.5 : 'unset',
  bottom: 2.5,
  background: theme.palette.primary.main,
  color: '#fff',
  border: 0,
  borderRadius: '.325em',
  cursor: 'pointer',
  width: '1.6rem',
  height: '1.6rem',
  display: 'flex',
}))

function EditThumbButton({action}:ThumbButtonProps){
  return <EditButton onClick={action}/>
}

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: theme.direction === 'ltr' ? 2.5 : 'unset',
  right: theme.direction === 'rtl' ? 2.5 : 'unset',
  bottom: 2.5,
  background: theme.palette.primary.main,
  color: '#fff',
  border: 0,
  borderRadius: '.325em',
  cursor: 'pointer',
  width: '1.6rem',
  height: '1.6rem',
  display: 'flex',
}))

function DeleteThumbButton({action}:ThumbButtonProps){
  return <DeleteButton onClick={action}/>
}

const DownloadButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: theme.direction === 'ltr' ? 2.5 : 'unset',
  right: theme.direction === 'rtl' ? 2.5 : 'unset',
  bottom: 2.5,
  background: theme.palette.primary.main,
  color: '#fff',
  border: 0,
  borderRadius: '.325em',
  cursor: 'pointer',
  width: '1.6rem',
  height: '1.6rem',
  display: 'flex',
}))

function DownloadThumbButton({action}:ThumbButtonProps){
  return <DownloadButton onClick={action} />
}

const PreviewButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: theme.direction === 'ltr' ? 2.5 : 'unset',
  right: theme.direction === 'rtl' ? 2.5 : 'unset',
  bottom: 2.5,
  background: theme.palette.primary.main,
  color: '#fff',
  border: 0,
  borderRadius: '.325em',
  cursor: 'pointer',
  width: '1.6rem',
  height: '1.6rem',
  display: 'flex',
}))

function PreviewThumbButton({action}:ThumbButtonProps){
  return <PreviewButton onClick={action} />
}

export {DownloadThumbButton, PreviewThumbButton, DeleteThumbButton, EditThumbButton}