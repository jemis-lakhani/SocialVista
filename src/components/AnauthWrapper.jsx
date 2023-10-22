import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const AnauthWrapper = ({ children }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 720px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.default}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the social Media for Sociapaths!
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AnauthWrapper;
