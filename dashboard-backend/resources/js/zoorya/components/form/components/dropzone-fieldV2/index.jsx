import { Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { styled } from '@mui/material/styles'
import IMGEditor from './IMGEditor'
import ThumbFactory from './Thumb/Factory';
import useTranslation from "@/hooks/useTranslation";
import useModal from '../../../../hooks/useModal'

const StyledBox = styled(Box)(({ theme, error }) => ({
  height: '8rem',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `2px dashed ${error ? theme.palette.error.main : theme.palette.primary.main}`,
}))

const ErrorText = styled('div')(() => ({
  color: '#f44336',
  marginLeft: '14px',
  marginRight: '14px',
  margin: '0',
  fontSize: '0.75rem',
  marginTop: '3px',
  fontWeight: '400',
  lineHeight: '1.66',
  letterSpacing: '0.03333em',
}))

const DropzoneField = ({
  name,
  control,
  hidden = false,
  thumbActions = true,
  maxSize = 2097152,
  errors,
  editValue,
  accept,
  handleRemove,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...r1 }, fieldState: { error, ...r2 } }) => {
        return (
          <Dropzone
            hidden={hidden}
            thumbActions={thumbActions}
            maxSize={maxSize}
            errors={errors}
            name={name}
            editValue={editValue}
            error={error}
            accept={accept}
            handleRemove={handleRemove}
            onChange={onChange}
            value={value}
            {...rest}
          />
        )
      }
      }
    />
  )
}

const Dropzone = ({
  hidden,
  maxSize,
  name,
  error,
  accept,
  onChange,
  value,
  multiple = false,
}) => {
  const { setError, clearErrors, setValue } = useFormContext();
  const { modal: cropperModal, openModal: openCropperModal, closeModal: closeCropperModal } = useModal();
  const [cropperFile, setCropperFile] = useState();
  const { t } = useTranslation();

  const generateMessageForRejectedFile = (errors, file) => `${file.name} : ${t(errors[0].code)}`

  const { getRootProps, getInputProps } = useDropzone({
    maxSize,
    multiple,
    onDrop: () => clearErrors(name),
    onDropAccepted: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map(file => file.type.includes("image") ? Object.assign(file, { preview: URL.createObjectURL(file) }) : file);
      onChange(filesWithPreview);
    },
    onDropRejected: (rejectedFiles) => {
      setError(name, { type: 'custom', message: generateMessageForRejectedFile(rejectedFiles[0].errors, rejectedFiles[0].file) });
    },
    accept: accept ?? { 'image/*': ['.jpeg', '.png'] },
  })

  const editCropperImage = async image => {
    const base64Response = await fetch(image);
    const blob = await base64Response.blob();
    const file = new File([blob], Date.now);
    Object.assign(file, { preview: URL.createObjectURL(blob) })
    if (multiple) setValue(name, [...value, file]);
    else setValue(name, [file]);
    closeCropperModal();
  }

  useEffect(() => {
    if (typeof value !== 'string') return;

    fetch(`${window.origin}/${value}`).then(async response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const file = new File([blob], Date.now)
      Object.assign(file, { preview: URL.createObjectURL(blob) })
      setValue(name, [file])
    })
  }, [value]);

  return (
    <>
      <Box sx={{ display: hidden ? 'none' : 'block' }}>
        <StyledBox {...getRootProps()} error={error}>
          <TextField
            {...getInputProps()}
            type="file"
            accept="image/*"
            hidden={hidden}
            sx={{ width: '100%', height: '100%' }}
          />
          <Typography sx={{ color: 'grey', fontSize: '13px' }}>
            <FormattedMessage id="drag_and_drop_some_files_here_or_click_here_to_select_files" />
          </Typography>
        </StyledBox>

        {value && typeof value !== 'string' && (
          <ThumbFactory
            files={value}
            selectedForEdit={(file) => {
              setCropperFile(file);
              openCropperModal();
            }}
            selectedForDelete={(file) => {
              if (!value) return;
              setValue(name, value.filter(_ => _ !== file));
            }}
          />
        )}

        {error && <ErrorText><FormattedMessage id={error.message} /></ErrorText>}
      </Box >

      <IMGEditor
        open={cropperModal}
        onClose={closeCropperModal}
        image={cropperFile?.preview}
        onSave={editCropperImage}
      />
    </>
  )
}

export default DropzoneField