import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const Login2FASchema = z.object({
  userId: z.string(),
  token: z.string(),
  passcode: z.number(),
});

export const ResetPasswordSchema = z.object({
  username: z.string().email(),
});

export const ChangePasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Must have at least 8 character" })
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
      {
        message: "Your password is not valid",
      }
    ),
});

export const TwoFactorSchema = z.object({
  passcode: z.string(),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  username: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Must have at least 8 character" })
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
      {
        message: "Your password is not valid",
      }
    ),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and privacy policy",
  }),
});

export interface DecodedToken {
  firstName?: string;
  profileImage?: string;
  userRoles?: string[];
  exp?: number;
  sub?: string;
  userName?: string;
}

export interface Menu {
  id: string;
  name: string;
  icon: string;
  parentId: string | null;
  link: string;
  priority: number;
  userRoles: string[];
  subMenus: Menu[];
  isEnabled: boolean;
}
