import { Alert, Snackbar } from "@mui/material";
import React from "react";

const CustomScnackbar = ({ open, handleClose, message, variant }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={variant} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomScnackbar;
