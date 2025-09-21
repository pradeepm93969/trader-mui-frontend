import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LOCAL_STORAGE_ACCESS_TOKEN } from "./constants";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSuperAdminUser(): boolean {
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return (decoded.userRoles || []).includes("ROLE_SUPER_ADMIN");
  } catch (e) {
    console.error("Failed to decode token", e);
    return false;
  }
}

export function isExternalTraderUser(): boolean {
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return (decoded.userRoles || []).includes("ROLE_EXTERNAL_TRADER");
  } catch (e) {
    console.error("Failed to decode token", e);
    return false;
  }
}
