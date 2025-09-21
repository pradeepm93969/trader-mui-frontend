"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Logo } from "./logo";
import { AppBar, Box, Toolbar, useTheme } from "@mui/material";

export const AuthHeader = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={theme.palette.mode === "dark" ? 0 : 4}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "transparent"
            : theme.palette.background.paper,
      }}
    >
      <Toolbar variant="dense">
        <Box
          sx={{
            flex: 1,
            display: "flex",
            height: 75,
            alignItems: "center",
          }}
        >
          <Logo />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, md: 2 },
          }}
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
