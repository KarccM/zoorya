import { Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { styled } from '@mui/material/styles'
import IMGEditor from './IMGEditor'
import ThumbContainer from './Thumb/ThumbContainer'
import FileThumb from './Thumb/FileThmub'
import ImageThumb from './Thumb/ImageThumb'
let backend = import.meta.env.VITE_BACKEND_END_POINT;
import Thumb from './Thumb/AbstructThumb';

const StyledBox = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: '8rem',
    outline: 'none',
    justifyItems: 'center',
}))

const ErrorText = styled('div')(({ theme }) => ({
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
    InputChange,
    hidden = false,
    thumbActions = true,
    maxSize = 2097152,
    errors,
    editValue,
    onDropAccepted = () => { },
    accept,
    handleRemove,
    ...rest
}) => {
    const [files, setFiles] = useState([]);
    return (
        <Controller
            render={({ field: { onChange }, fieldState: { error } }) => (
                <Dropzone
                    onChange={e => onChange(e.target.files[0])}
                    setFiles={setFiles}
                    files={files}
                    hidden={hidden}
                    thumbActions={thumbActions}
                    maxSize={maxSize}
                    errors={errors}
                    name={name}
                    editValue={editValue}
                    InputChange={InputChange}
                    error={error}
                    onDropAccepted={onDropAccepted}
                    accept={accept}
                    handleRemove={handleRemove}
                    {...rest}
                />
            )}
            name={name}
            control={control}
        />
    )
}

const Dropzone = ({
    onChange,
    setFiles,
    files,
    hidden,
    thumbActions,
    maxSize,
    errors,
    name,
    editValue,
    onDropAccepted,
    InputChange,
    // error,
    accept,
    handleRemove,
    multiple = false,
    ...rest
}) => {

    const fileSizeValidator = file => {
        if (file.length > maxSize)
            return {
                code: 'file-too-large',
                message: `Max file size is ${maxSize / 2048} MB`,
            }
    }

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        ...rest,
        onDrop: acceptedFiles => {
            setFiles(prev => ([...prev]))
            acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            )
            if (multiple)
                setFiles(prev => [...acceptedFiles, ...prev])
            else
                setFiles([acceptedFiles[0]])
        },
        onDropAccepted: () => {
            onDropAccepted()
        },
        maxSize,
        validator: fileSizeValidator,
        onDropRejected: () => {
            setFiles(null)
        },
        accept: accept
            ? accept
            : {
                'image/*': ['.jpeg', '.png'],
            },
    })


    const [cropperModal, setCropperModal] = useState(false)
    const [cropperFile, setCropperFile] = useState({})

    const dataURLtBlob = dataurl => {
        var byteString
        if (dataurl.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataurl.split(',')[1])
        else byteString = unescape(dataurl.split(',')[1])

        var mimeString = dataurl.split(',')[0].split(':')[1].split(';')[0]

        var ia = new Uint8Array(byteString.length)
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }

        return new Blob([ia], { type: mimeString })
    }

    function toDataURL(url, id = null) {
        if (url) {
            var xhr = new XMLHttpRequest()
            xhr.open('get', `${backend}${url}`)
            xhr.responseType = 'blob'
            xhr.send()
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    xhr.response.preview = URL.createObjectURL(xhr.response)
                    const response = xhr.response;
                    if (multiple) {
                        setFiles(prev => [...prev, { ...response, id, type: response.type, url }])
                    }
                    else
                        setFiles([{ ...response, id, type: response.type, url }])
                }
            }
        }
    }

    const editCropperImage = image => {
        const updatedFile = dataURLtBlob(image)
        updatedFile.preview = URL.createObjectURL(updatedFile)
        setFiles(prev => {
            prev = prev.filter(file => file?.preview !== cropperFile?.preview)
            if (multiple)
                return [...prev, updatedFile]
            else
                [updatedFile]
        })
        setCropperModal(false)
    }

    useEffect(() => {
        if (multiple)
            InputChange(name, files)
        else { files && InputChange(name, files[0]) }
    }, [files])

    useEffect(() => {
        if (Array.isArray(editValue)) {
            editValue.map(_ => toDataURL(_.documentFileUrl, _.id && _.id))
        }
        if (!Array.isArray(editValue) && editValue !== null) {
            toDataURL(editValue)
        }
    }, [])

    function defalutPreviewAction(file, index) {
        window.open(`http://localhost:8000/${file.url}`, '_blank')
    }

    function defalutDownloadAction(file, index) {
        console.log('download');
    }

    function defalutDeleteAction(file, index) {
        setFiles(() => {
            handleRemove && file.id && handleRemove(file.id)
            files.splice(index, 1)
            return [...files]
        })
    }

    function defalutEditAction(file, index) {
        setCropperFile(files[index])
        setCropperModal(true)
    }

    const defaultActions = {
        deleteAction: defalutDeleteAction,
        previewAction: defalutPreviewAction,
        editAction: defalutEditAction,
        downloadAction: defalutDownloadAction,
    }


    return (
        <>
            <Box sx={{ display: hidden ? 'none' : 'block' }}>
                <StyledBox {...getRootProps()}>
                    <TextField
                        type="file"
                        {...getInputProps({ onUploaderChange })}
                        accept="image/*"
                        hidden={hidden}
                        sx={{ width: '100%', height: '100%' }}
                    />
                    <Typography sx={{ color: 'grey', fontSize: '13px' }}>
                        <FormattedMessage id="drag_and_drop_some_files_here_or_click_here_to_select_files" />
                    </Typography>
                </StyledBox>
                <ThumbContainer>
                    {uploadedFiles.map((file, index) => {
                        return (
                            <Thumb file={file} index={index} {...defaultActions} key={index}>
                                {file.type?.includes('image') ?
                                    <ImageThumb src={file.preview} /> :
                                    <FileThumb />
                                }
                            </Thumb>
                        )
                    })}
                </ThumbContainer>
                <ErrorText>
                    {error && <FormattedMessage id={error?.message} />}
                    {fileRejections.length > 0 &&
                        `Max file size is ${(maxSize / 1048576).toFixed(2)} MB`}
                </ErrorText>
            </Box >
            <ErrorText sx={{ display: hidden ? 'block' : 'none', marginTop: '220px' }}>
                {fileRejections.length > 0 &&
                    `Max file size is ${(maxSize / 1048576).toFixed(2)} MB`}
            </ErrorText>
            <IMGEditor
                open={cropperModal}
                onClose={() => setCropperModal(false)}
                image={cropperFile?.preview}
                onSave={editCropperImage}
            />
        </>
    )
}

export default DropzoneField
