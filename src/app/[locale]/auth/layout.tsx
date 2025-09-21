import type { Metadata } from "next";
import { Box } from "@mui/material";
import { AuthHeader } from "@/components/header/AuthHeader";

export const metadata: Metadata = {
  title: "Ethax Trader",
  description: "Welcome to next generation trading",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        minHeight: "100svh", // same as min-h-svh
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AuthHeader />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default", // from theme
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
