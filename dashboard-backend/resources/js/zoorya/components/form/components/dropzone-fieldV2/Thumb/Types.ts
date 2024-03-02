type ThumbAction = (file:FileThumb, index:number)=>void

type ThumbButtonProps = {
  action:ThumbAction
}

type ThumbProps = {
  file:FileThumb,
  index: number,
}

type ThumbImgProps = {
  src: string
}

type FileThumb = {
  preview: string,
  type: string,
  name: string,
}

export {ThumbButtonProps, ThumbProps, FileThumb, ThumbImgProps, ThumbAction}