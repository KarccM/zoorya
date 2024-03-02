import React from "react";
import './style.css';
import { Box } from "@mui/material";

const LoadingBlocks = ({height='100svh'}) => {
  return (
    <Box sx={{
      display:'grid',
      placeItems:'center',
      marginY:2,
      height,
    }}>
      <div className="loader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
      </div>
    </Box>

  );
}

export default LoadingBlocks;
