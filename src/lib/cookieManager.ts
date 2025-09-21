"use server";

import "server-only";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { DecodedToken } from "@/schemas";

const COOKIE_NAME = "loggedIn";

export async function setLoggedInCookie(token: string) {
  const decodedToken: DecodedToken = jwtDecode(token);

  if (typeof decodedToken.exp === "undefined") {
    throw new Error("Token does not contain an expiration time.");
  }
  const expireAt = decodedToken.exp;
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "true", {
    httpOnly: true,
    secure: true,
    expires: new Date(expireAt * 1000),
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteLoggedInCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getLoggedInCookie() {
  const cookieStore = await cookies();

  const loggedInCookie = cookieStore.get(COOKIE_NAME);
  if (!loggedInCookie) {
    return null;
  }
  return loggedInCookie.value;
}
