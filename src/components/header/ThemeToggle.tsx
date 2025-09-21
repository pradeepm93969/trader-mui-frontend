"use client";

import { useContext } from "react";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ColorModeContext } from "../theme/ThemeRegistry";

export function ThemeToggle() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <IconButton onClick={toggleColorMode} color="inherit" sx={{ p: 0 }}>
      {mode === "dark" ? (
        <LightMode color="secondary" />
      ) : (
        <DarkMode color="secondary" />
      )}
    </IconButton>
  );
}
