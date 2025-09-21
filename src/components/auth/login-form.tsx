"use client";

import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/auth";
import {
  DASHBOARD_URL,
  LOCAL_STORAGE_2FA,
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_FIRST_NAME,
  LOCAL_STORAGE_USER_ID,
} from "@/lib/constants";
import {
  Email,
  Lock,
  Mail,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import CustomLink from "../ui/CustomLink";

const LoginForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isTwoFactorOpen, setIsTwoFactorOpen] = useState(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword((prev) => !prev);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const { data, error } = await login(values);

      if (error) {
        alert(error);
        return;
      }

      localStorage.setItem(LOCAL_STORAGE_USER_ID, data.userId);

      if (data.twoFactorAuthenticationEnabled) {
        localStorage.setItem(LOCAL_STORAGE_FIRST_NAME, data.firstName);
        localStorage.setItem(LOCAL_STORAGE_2FA, data.accessToken);
        setIsTwoFactorOpen(true);
      } else {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken);
        router.replace(`/${locale}${DASHBOARD_URL}`);
      }
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {/* Username */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label={t("auth.email")}
              placeholder={t("auth.email")}
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email /> {/* Your start icon */}
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ borderRadius: "32px" }}
            />
          )}
        />

        {/* Password */}
        <Box>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? "text" : "password"}
                label={t("auth.password")}
                placeholder={t("auth.password")}
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock /> {/* Your start icon */}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggle} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <CustomLink
              text={t("auth.login-forgot-password")}
              href={`/${locale}/auth/resetPassword`}
            />
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          fullWidth
          size="large"
          sx={{ fontWeight: "bold" }}
        >
          {isPending ? (
            <CircularProgress size={25} color="inherit" />
          ) : (
            t("auth.login-button")
          )}
        </Button>

        {/* Register Section */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <Typography variant="body1">
            {t("auth.login-no-account-yet")}
          </Typography>
          <CustomLink
            text={t("auth.login-sign-up-now")}
            href={`/${locale}/auth/register`}
            fontWeight="bold"
          />
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
