/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Login2FASchema, LoginSchema } from "@/schemas";
import * as z from "zod";
import axios from "axios";
import { deleteLoggedInCookie, setLoggedInCookie } from "@/lib/cookieManager";
import { plainAxios } from "./axiosClient";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  let response;
  try {
    response = await plainAxios.post(`/user-service/v1/auth/login`, values);

    // Set JWT as HttpOnly, Secure cookie
    if (!response.data.twoFactorAuthenticationEnabled) {
      await setLoggedInCookie(response.data.accessToken);
    }
    return { data: response.data, error: null };

  } catch (error: any) {
    console.error("Login error:", error);
    const message =
      error.response?.data?.errors?.[0]?.errorMessage ||
      error.message ||
      "Login failed";
    return { data: null, error: message };
  }

};

export const googlelogin = async (code: string) => {
  let response;
  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user-service/v1/social/auth/google-callback?code=${code}`
    );
    
    // Set JWT as HttpOnly, Secure cookie
    if (!response.data.twoFactorAuthenticationEnabled) {
      await setLoggedInCookie(response.data.accessToken);
    }
    return { data: response.data, error: null };

  } catch (error: any) {
    console.error("Login error:", error);
    const message =
      error.response?.data?.errors?.[0]?.errorMessage ||
      error.message ||
      "Login failed";
    return { data: null, error: message };
  }
};

export const login2FA = async (values: z.infer<typeof Login2FASchema>) => {
  let response;
  try {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user-service/v1/auth/login2FA`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await setLoggedInCookie(response.data.accessToken);
    return { data: response.data, error: null };

  } catch (error: any) {
    console.error("Login error:", error);
    const message =
      error.response?.data?.errors?.[0]?.errorMessage ||
      error.message ||
      "Login failed";
    return { data: null, error: message };
  }
};

export const logOut = async () => {
  try {
    await deleteLoggedInCookie();
  } catch (error) {
    throw Error(JSON.stringify(error));
  }
};
