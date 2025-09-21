import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
} from "@mui/material";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

import LoginForm from "@/components/auth/login-form";
import SocialLoginForm from "@/components/auth/social-login-form";

export const metadata: Metadata = {
  title: "Ethax Trader - Login",
  description: "Login to the application",
};

const LoginPage = () => {
  const t = useTranslations();

  return (
    <Card
      elevation={4}
      sx={{
        width: "100%",
        maxWidth: { md: 400, lg: 500 },
        mx: 2,
        backgroundColor: "background.paper",
        pt: 2,
      }}
    >
      {/* Header */}
      <CardHeader
        title={
          <Typography variant="h5" align="center">
            {t("auth.login-header")}
          </Typography>
        }
        subheader={
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            {t("auth.login-sub-header")}
          </Typography>
        }
        sx={{ textAlign: "center" }}
      />

      {/* Content */}
      <CardContent sx={{ width: "100%", px: { xs: 0, sm: 3, md: 6 } }}>
        <LoginForm />
      </CardContent>

      {/* Footer (Actions area) */}
      <CardActions sx={{ width: "100%", px: { xs: 0, sm: 3, md: 6 }, pb: 5 }}>
        <SocialLoginForm />
      </CardActions>
    </Card>
  );
};

export default LoginPage;
