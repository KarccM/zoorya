import { Avatar, Box, styled } from "@mui/material";
import React from "react";

interface ExtendedImportMeta extends ImportMeta {
  env: {
    VITE_BACKEND_END_POINT: string;
  };
}
let backend = (import.meta as ExtendedImportMeta).env.VITE_BACKEND_END_POINT;

const AvatarBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme?.palette?.mode === 'dark' ? theme?.palette?.grey[500_12] : theme?.palette?.grey[100],
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '200px',
  padding: '24px',
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  width: '100%'
}));

const StyledAvatar = styled(Avatar)({
  width: '180px',
  height: '180px',
  // position: 'absolute',
});

export default function AvatarCell({ url, variant = 'rounded' }: { url: string | null, variant: "rounded" | "circular" | "square" }) {
  return <>
    {url &&
      <AvatarBox>
        <StyledAvatar variant={variant} className="avatar" src={`${backend}${url}`} />
      </AvatarBox>
    }
  </>
}