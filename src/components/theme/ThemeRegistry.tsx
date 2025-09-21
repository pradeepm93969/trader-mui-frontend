"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "@/components/theme/theme";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<"light" | "dark" | null>(null);

  // Load stored mode on mount
  React.useEffect(() => {
    const storedMode = localStorage.getItem("themeMode") as
      | "light"
      | "dark"
      | null;
    setMode(storedMode ?? "dark"); // default to dark if not stored
  }, []);

  const colorMode = React.useMemo<ColorModeContextType>(
    () => ({
      mode: mode ?? "dark",
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", next);
          return next;
        });
      },
    }),
    [mode]
  );

  // Avoid rendering until mode is loaded
  if (!mode) return null;

  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
