import { Box } from "@mui/material";
import { Buffer } from "buffer";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`data:image/png;base64,${Buffer.from(image).toString("base64")}`}
      />
    </Box>
  );
};

export default UserImage;
