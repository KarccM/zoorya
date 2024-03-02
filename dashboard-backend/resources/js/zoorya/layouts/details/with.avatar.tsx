import { Grid, Stack, styled } from "@mui/material"
import React from "react"
import NormalCell from '../../components/cells/normal.cell';
import AvatarCell from '../../components/cells/avatar';
import HtmlCell from '../../components/cells/html.cell';

type Cell = {
  title:string,
  content:string,
  type: string,
}

type Props = {
  cells: Cell[],
  url:string,
  avatarUrl:string|null
}
const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme?.palette?.mode === 'dark' ? theme?.palette?.grey[500_12] : theme?.palette?.grey[100],
  borderRadius: '16px',
  padding: '24px',
  height: 'fit_content',
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
}));

export default function DetailsWithAvatar({ cells, avatarUrl = null }:Props) {
  return (
    <StyledStack gap={4}>
      <AvatarCell url={avatarUrl} />
      <Grid container spacing={2}>
        {cells.map(({title, content, type})=> 
          <Grid item xs={6} key={title}> 
            {type === 'normal' && <NormalCell title={title} content={content}/>}
            {type === 'html' && <HtmlCell title={title} content={content}/>}
          </Grid>
        )}
      </Grid>
    </StyledStack>
  )
}