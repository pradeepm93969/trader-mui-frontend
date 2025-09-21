"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Locale, useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useMemo, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Autocomplete,
  TextField,
  Typography,
  Box,
  Divider,
  Checkbox,
  ListItemText,
  InputAdornment,
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";
import { Close, Search } from "@mui/icons-material";

const localeNames: Record<string, string> = {
  ar: "Arabic",
  zh: "Chinese",
  cs: "Czech",
  en: "English",
  et: "Estonian",
  fr: "French",
  de: "German",
  ja: "Japanese",
  ko: "Korean",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  es: "Spanish",
  tr: "Turkish",
};

export default function AppLanguageSwitcher() {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);

  const options = useMemo(
    () =>
      routing.locales
        .map((locale) => ({
          code: locale,
          label: localeNames[locale] || locale,
        }))
        .sort((a, b) =>
          a.code === currentLocale ? -1 : b.code === currentLocale ? 1 : 0
        ),
    [currentLocale]
  );

  const handleChange = (locale: string | null) => {
    if (!locale) return;
    const segments = pathname?.split("/") || [];
    segments[1] = locale;
    const href = segments.join("/") || "/";
    window.location.href = href;
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }}>
        <PublicIcon color="secondary" />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" flexDirection="column">
            <Typography variant="inherit" fontWeight="semibold">
              {t("header.language-selection.title")}
            </Typography>
            <Box
              sx={{
                height: 3,
                width: 90,
                bgcolor: "primary.main",
                mt: 0.5,
                borderRadius: 1,
              }}
            />
          </Box>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.secondary.main,
            }}
          >
            <Close fontSize="small" />
          </IconButton>
          <Divider />
        </DialogTitle>

        <DialogContent sx={{ mt: 2, pb: 8 }}>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            defaultValue={options.find((o) => o.code === currentLocale)}
            onChange={(_, value) => handleChange(value?.code || null)}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => {
              const { key, ...rest } = props;
              const isFocused = props.className?.includes("Mui-focused");
              return (
                <li key={key} {...rest}>
                  <Checkbox
                    size="small"
                    checked={selected}
                    sx={{
                      mr: 2,
                    }}
                  />
                  <ListItemText primary={option.label} />
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t("header.language-selection.selection")}
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            fullWidth
          />
        </DialogContent>
        <></>
      </Dialog>
    </>
  );
}
