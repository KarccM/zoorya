import {Grid, Box, styled} from '@mui/material';
import React from "react"
import NormalCell from '../../components/cells/normal.cell';

type Cell = {
  title:string,
  content:string,
}

type Props = {
  cells: Cell[]
};

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme?.palette?.mode === 'dark' ? theme?.palette?.grey[500_12] : theme?.palette?.grey[100],
  borderRadius: '16px',
  padding: '24px',
  height: 'fit_content',
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
}));

export default function DetailsWithoutAvatar({ cells }:Props) {
   return <StyledBox>
    <Grid container>
      {cells.map(({title, content})=>  <Grid item xs={6} key={title}> <NormalCell title={title} content={content}/> </Grid>)}
    </Grid>
  </StyledBox>
}