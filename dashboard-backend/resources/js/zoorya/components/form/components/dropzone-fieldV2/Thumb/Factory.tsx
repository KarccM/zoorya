import { Grid } from "@mui/material"
import React from "react"
import ImageThumb from "./ImageThumb";
import FileThumb from "./FileThmub";

interface ExtendedFile extends File {
  preview?: string | undefined;
}

export { ExtendedFile };

export default ({ files, selectedForEdit, selectedForDelete }: { files: ExtendedFile[], selectedForEdit: (file: ExtendedFile) => void, selectedForDelete: (file: ExtendedFile) => void }) => {
  return <Grid container spacing={1} mt={1}>
    {files.map((file, index) => (
      <Grid key={index} item xs={2}>
        {file.preview ?
          <ImageThumb file={file} selectedForEdit={selectedForEdit} selectedForDelete={selectedForDelete} /> :
          <FileThumb file={file} selectedForDelete={selectedForDelete} />}
      </Grid>
    ))}
  </Grid>
}