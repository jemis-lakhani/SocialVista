import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/flexBetween";
import { useNavigate } from "react-router";

const AdvertWidget = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={
          "https://assets-prd.ignimgs.com/2023/05/02/best-macbooks-to-buy-2-1683051709961.jpg"
        }
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Macbook</Typography>
        <Box
          onClick={() => {
            navigate("https://www.apple.com");
            // navigate(0);
          }}
        >
          {" "}
          <Typography
            color={main}
            variant="h6"
            fontWeight="400"
            sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: " pointer",
              },
            }}
          >
            apple.com
          </Typography>
        </Box>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Are you ready to elevate your computing experience? Look no further! We
        proudly present our latest, cutting-edge laptop that's designed to meet
        all your tech-savvy needs.
        <br />
        <br />
        🚀 Key Features: <br />✅ [Highlight Key Feature 1 - e.g.,
        Lightning-Fast Processing] <br />✅ [Highlight Key Feature 2 - e.g.,
        Crisp and Clear Full HD Display]
        <br /> ✅ [Highlight Key Feature 3 - e.g., All-Day Battery Life] <br />
        ✅ [Highlight Key Feature 4 - e.g., Sleek and Lightweight Design]
        <br /> ✅ [Highlight Key Feature 5 - e.g., Ultra-Fast SSD Storage]
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
