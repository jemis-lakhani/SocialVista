import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
  // Box allow us to use css properies as parameters for a component
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
