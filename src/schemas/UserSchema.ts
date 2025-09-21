import * as z from "zod";

export const ProfileUpdateSchema = z.object({
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
});

export const PasswordUpdateSchema = z.object({
  currentPassword: z.string().min(8, { message: "Password is required" }),
  newPassword: z.string().min(8, { message: "Password is required" }),
});

export const UserRoleEnum = z.enum([
  "ROLE_EXTERNAL_TRADER",
  "ROLE_INTERNAL_TRADER",
  "ROLE_ADMIN",
  "ROLE_SUPER_ADMIN",
]);
export type UserRoleEnum = z.infer<typeof UserRoleEnum>;

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().email(),
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  userRoles: z.array(UserRoleEnum),
  userType: z.enum(["TRADER", "INTERNAL_USER"]), // adjust values if needed
  userStatus: z.enum(["PENDING_ACTIVATION", "ACTIVATED", "BLOCKED", "DELETED"]),
  invalidLoginAttempts: z.number(),
  invalidLoginAt: z.string().optional().nullable(), // ISO string; could use .datetime() in some date libraries
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  twoFAEnabled: z.boolean(),
});
export type User = z.infer<typeof UserSchema>;

export const twoFASchema = z.object({
  twoFAEnabled: z.boolean(),
});

export const CustomerSupportTicketSchema = z.object({
  id: z.string(),
  user: UserSchema,
  message: z.string().min(1),
  customerSupportTicketStatus: z.enum([
    "OPEN",
    "ASSIGNED",
    "INPROGRESS",
    "CLOSED",
  ]),
  customerSupportTicketPriority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  assignedToUser: UserSchema.optional(),
  assignedDate: z.string().datetime().optional(),
  closedByUser: UserSchema.optional(),
  closedByDate: z.string().datetime().optional(),
  remarks: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdBy: z.string(),
  updatedBy: z.string(),
});

export type CustomerSupportTicket = z.infer<typeof CustomerSupportTicketSchema>;

export interface UserActivityLog {
  id: string;
  userId: string;
  ipAddress: string;
  userActivity: string;
  data: Record<string, string>;
  createdAt: string;
}

export interface UserBellNotification {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface UserAppNotificationDevices {
  id: string;
  deviceId: string;
}

export const CreateTicketSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type CreateTicketFormValues = z.infer<typeof CreateTicketSchema>;

export type UpdateTicketFormValues = {
  customerSupportTicketPriority: string;
  customerSupportTicketStatus: string;
  remarks: string;
};
