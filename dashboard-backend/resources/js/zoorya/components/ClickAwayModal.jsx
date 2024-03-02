import React from "react";
import { Box, Modal } from "@mui/material";
import { useTheme } from "@mui/styles";

const ClickAwayModal = ({ handleClose, open, children, width = 600 }) => {
  const theme = useTheme()

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "transparent",
            backgroundColor: theme.palette.background.paper,
            maxHeight: "80%",
            minWidth: 450,
            width: width,
            minHeight: 200,
            paddingY: 6,
            paddingX: 4,
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#707070",
              borderRadius: "6px",
              padding: "2px",
              visibility: "hidden",
            },
            "&:hover": {
              "&::-webkit-scrollbar-thumb": {
                visibility: "visible",
              },
            },
          }}
        >
          {children}
        </Box>
      </Modal>
    </Box>
  )
};
export default ClickAwayModal;