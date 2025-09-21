import Image from "next/image";
import { Box } from "@mui/material";

export const Logo = () => {
  return (
    <Box
      sx={{
        width: 300,
        position: "relative",
        aspectRatio: "300 / 36",
        borderRadius: 1.5, // rounded-sm equivalent
        overflow: "hidden",
      }}
    >
      <Image
        src="/ethax.svg"
        alt="Logo"
        fill
        style={{ objectFit: "contain", background: "#121212" }}
      />
    </Box>
  );
};
