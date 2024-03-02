import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
let backend = ""//import.meta.env.VITE_BACKEND_END_POINT;
function useUploader({
  onChange,
  hidden,
  thumbActions,
  maxSize,
  errors,
  name,
  editValue,
  onDropAccepted,
  InputChange,
  error,
  accept,
  handleRemove,
  multiple = false,
  ...rest
}){
    const [files, setFiles] = useState([])

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


  return {
    files,
    defaultActions,
    error,
    maxSize,
    cropperModal,
    cropperFile,
    editCropperImage,
    getInputProps,
    getRootProps,
    fileRejections,
    onChange,
  }
}
