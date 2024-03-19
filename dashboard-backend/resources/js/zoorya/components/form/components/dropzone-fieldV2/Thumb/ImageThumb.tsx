import React from "react";
import { ExtendedFile } from "./Factory";
import { Button, IconButton, ImageListItem, Tooltip, styled } from "@mui/material";
import Iconify from '@/components/Iconify';
import { FormattedMessage } from "react-intl";
import { useFormContext } from "react-hook-form";

const Image = styled('img')(() => ({
  height: 140,
  width: "100%",
  borderRadius: 4,
  objectFit: 'cover',
  border: `0px soild #000`,
}))

const Overlay = styled('div')(() => ({
  bottom: 0,
  width: '100%',
  height: '40px',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'all 0.5s ease',
  backgroundColor: 'rgba(0 0 0 / 25%)',
  zIndex: 10,
  '&:hover': { opacity: 100 },
}))

const EditButton = styled(IconButton)(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 20,
  boxShadow: 'none',
}));

const DeleteButton = styled(IconButton)(() => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  zIndex: 20,
  boxShadow: 'none',
}));

export default ({ file, selectedForEdit, selectedForDelete }: {
  file: ExtendedFile,
  selectedForEdit: (file: ExtendedFile) => void,
  selectedForDelete: (file: ExtendedFile) => void,
}) => {

  return (
    <ImageListItem sx={{ position: 'relative' }}>
      <Image src={file.preview} alt={file.name} loading="lazy" />
      <Overlay />

      <Tooltip title={<FormattedMessage id="edit" />}>
        <EditButton onClick={() => selectedForEdit(file)} color="primary">
          <Iconify icon="material-symbols-light:edit-sharp" />
        </EditButton>
      </Tooltip>
      <Overlay />

      <Tooltip title={<FormattedMessage id="delete" />}>
        <DeleteButton onClick={() => selectedForDelete(file)} color="error">
          <Iconify icon="ic:sharp-delete" />
        </DeleteButton>
      </Tooltip>
    </ImageListItem>
  );
}