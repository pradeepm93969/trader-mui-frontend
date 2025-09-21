"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00FFFF",
    },
    secondary: {
      main: "#E5E7EB",
    },
    background: {
      default: "#09090B",
      paper: "#09090B",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "radial-gradient(circle at top, #27272A, #18181B)", // dark gradient
          color: "#E5E7EB", // text color inside Card
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // center horizontally
          justifyContent: "center", // center vertically (if height is set)
          textAlign: "center",
          padding: 10,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        subheader: {
          marginTop: 8, // space between title & subheader
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "radial-gradient(circle at top, #27272A, #18181B)",
          color: "#E5E7EB", // optional: text color
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          background: "transparent", // ensures DialogContent matches Paper
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          background: "transparent", // ensures DialogTitle matches Paper
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0px 1000px #121212 inset",
            WebkitTextFillColor: "#E5E7EB",
          },
          "& textarea:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0px 1000px #121212 inset",
            WebkitTextFillColor: "#E5E7EB",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E5E7EB", // teal focus
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#E5E7EB", // default color for light mode
          "&.Mui-focused": {
            color: "#E5E7EB", // keep black even when focused
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          /* Webkit scrollbar for Chrome, Edge, Safari */
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#121212",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#444",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#666",
          },

          /* Firefox scrollbar */
          scrollbarColor: "#444 #121212",
          scrollbarWidth: "thin",

          "& input, & textarea, & input:focus, & textarea:focus, & input:hover, & textarea:hover":
            {
              backgroundColor: "transparent !important",
              color: "#E5E7EB !important",
              caretColor: "#E5E7EB",
              WebkitTapHighlightColor: "#E5E7EB",
            },
          // Autofill for Chrome/Edge/Safari
          "& input:-webkit-autofill, & textarea:-webkit-autofill, & input:-webkit-autofill:focus, & textarea:-webkit-autofill:focus, & input:-webkit-autofill:hover, & textarea:-webkit-autofill:hover":
            {
              WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
              WebkitTextFillColor: "#E5E7EB !important",
              caretColor: "#E5E7EB",
              WebkitTapHighlightColor: "#E5E7EB",
            },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00FFFF",
    },
    background: {
      default: "#E5E7EB",
    },
    secondary: {
      main: "#09090B",
    },
    info: {
      main: "#2196f3",
    },
    text: {
      primary: "#09090B", // darker than default
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // center horizontally
          justifyContent: "center", // center vertically (if height is set)
          textAlign: "center",
          padding: 10,
          borderRadius: 16,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontWeight: "bold", // bold header
        },
        subheader: {
          marginTop: 8, // space between title & subheader
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
      defaultProps: {
        color: "info", // use the theme's primary color
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          border: "1px solid #008080", // teal border
          borderRadius: 6, // optional: rounded corners
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#09090B", // default color for light mode
          "&.Mui-focused": {
            color: "#09090B", // keep black even when focused
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow:
              "0 0 0 100px var(--mui-palette-background-paper) inset",
            WebkitTextFillColor: "var(--mui-palette-text-primary)",
            caretColor: "var(--mui-palette-text-primary)",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#19090B", // teal focus
          },
        },
      },
    },
  },
});
