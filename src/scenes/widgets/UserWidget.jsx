import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/flexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, userImage }) => {
  const user = useSelector((state) => state.user);
  const friends = useSelector((state) => state.friends);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = user;

  return (
    <WidgetWrapper>
      {/**FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={userImage} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/** Second Row */}
      <Box p="1rem 0">
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          marginBottom="0.5rem"
        >
          <LocationOnOutlined
            fontSize="large"
            sx={{
              color: main,
            }}
          />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined
            fontSize="large"
            sx={{
              color: main,
            }}
          />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />

      {/** THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impression of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />

      {/** FOURTH ROW */}
      <Box p="1rem 0">
        <Typography color={main} fontSize="1rem" fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween mb="0.5rem" gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="Twitter"></img>
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium} fontWeight="500">
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined
            sx={{
              color: main,
            }}
          />
        </FlexBetween>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="LinkedIN"></img>
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium} fontWeight="500">
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined
            sx={{
              color: main,
            }}
          />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
