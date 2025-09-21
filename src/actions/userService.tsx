/* eslint-disable @typescript-eslint/no-explicit-any */
import { authAxios } from "@/actions/axiosClient";
import { isAxiosError } from "axios";
import { toastError } from "@/components/ui/toast";
import LocalStorageCache from "@/lib/LocalStorageCache";
import {
  LOCAL_STORAGE_UNREAD_NOTIFICATIONS_COUNT,
  LOCAL_STORAGE_USER,
  LOCAL_STORAGE_USER_NOTIFICATION_DEVICES,
  LOCAL_STORAGE_USER_NOTIFICATIONS,
} from "@/lib/constants";
import {
  CreateTicketFormValues,
  PasswordUpdateSchema,
  ProfileUpdateSchema,
  UpdateTicketFormValues,
  UserAppNotificationDevices,
} from "@/schemas";
import { z } from "zod";
import { formatISO } from "date-fns";

const contextPath = "/user-service";
const cacheTime = 5 * 60 * 1000;

/**
 * Common error handler for the service
 */
const handleError = (e: unknown, fallbackMessage: string) => {
  let message = fallbackMessage;
  if (isAxiosError(e) && e.response) {
    const errorObj = e.response.data?.errors?.[0];
    if (errorObj) {
      message = `${errorObj.errorCode}: ${errorObj.errorMessage}`;
    } else {
      message = e.response.data?.message || fallbackMessage;
    }
  } else if (e instanceof Error) {
    message = e.message;
  }
  toastError(message);
};

export const fetchUnreadCount = async (userId: string) => {
  const count = LocalStorageCache.get<number>(
    LOCAL_STORAGE_UNREAD_NOTIFICATIONS_COUNT
  );
  if (count != undefined && count > -1) {
    return count;
  }
  try {
    const res = await authAxios.get(
      `${contextPath}/v1/notifications/${userId}/countUnread`
    );
    LocalStorageCache.put(
      LOCAL_STORAGE_UNREAD_NOTIFICATIONS_COUNT,
      res.data,
      cacheTime
    );
    return res.data;
  } catch (e) {
    handleError(e, "Failed to fetch unread count.");
    throw e;
  }
};

/**
 * Fetch notifications for a user
 */
export const fetchUserNotifications = async (userId: string) => {
  const data = LocalStorageCache.get<Notification[]>(
    LOCAL_STORAGE_USER_NOTIFICATIONS
  );
  if (data) {
    return data;
  }
  try {
    const res = await authAxios.get(
      `${contextPath}/v1/notifications/${userId}`
    );
    LocalStorageCache.put(
      LOCAL_STORAGE_USER_NOTIFICATIONS,
      res.data.content,
      cacheTime
    );
    return res.data.content;
  } catch (e) {
    handleError(e, "Failed to fetch notifications.");
    throw e;
  }
};

/**
 * Mark all notifications as read for a user
 */
export const markAllRead = async (userId: string) => {
  try {
    await authAxios.post(
      `${contextPath}/v1/notifications/${userId}/markAllRead`,
      {}
    );
    LocalStorageCache.delete(LOCAL_STORAGE_UNREAD_NOTIFICATIONS_COUNT);
    LocalStorageCache.delete(LOCAL_STORAGE_USER_NOTIFICATIONS);
  } catch (e) {
    handleError(e, "Failed to mark notifications as read.");
    throw e;
  }
};

/**
 * Mark a specific notification as read
 */
export const markAsRead = async (userId: string, id: string) => {
  try {
    await authAxios.post(
      `${contextPath}/v1/notifications/${userId}/message/${id}/read`,
      {}
    );
    LocalStorageCache.delete(LOCAL_STORAGE_UNREAD_NOTIFICATIONS_COUNT);
    LocalStorageCache.delete(LOCAL_STORAGE_USER_NOTIFICATIONS);
  } catch (e) {
    handleError(e, "Failed to mark notification as read.");
    throw e;
  }
};

export const fetchUser = async (userId: string) => {
  const data = localStorage.getItem(LOCAL_STORAGE_USER);
  if (data) {
    return data;
  }
  try {
    const res = await authAxios.get(`${contextPath}/v1/users/${userId}`);
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(res.data));
    return res.data;
  } catch (e) {
    handleError(e, "Failed to fetch User.");
    throw e;
  }
};

export const updateUserPassword = async (
  userId: string,
  values: z.infer<typeof PasswordUpdateSchema>
) => {
  try {
    await authAxios.put(
      `${contextPath}/v1/users/${userId}/updatePassword`,
      values
    );
  } catch (e) {
    handleError(e, "Failed to update User password.");
    throw e;
  }
};

export const updateUserProfile = async (
  userId: string,
  values: z.infer<typeof ProfileUpdateSchema>
) => {
  try {
    const res = await authAxios.put(
      `${contextPath}/v1/users/${userId}/updateProfile`,
      values
    );
    return res.data;
  } catch (e) {
    handleError(e, "Failed to update User profile.");
    throw e;
  }
};

export const fetchUserDevices = async (userId: string) => {
  const data = LocalStorageCache.get<UserAppNotificationDevices[]>(
    LOCAL_STORAGE_USER_NOTIFICATION_DEVICES
  );
  if (data) {
    return data;
  }
  try {
    const res = await authAxios.get(
      `${contextPath}/v1/user-app-notification-settings/user/${userId}`
    );
    LocalStorageCache.put(
      LOCAL_STORAGE_USER_NOTIFICATION_DEVICES,
      res.data,
      cacheTime
    );
    return res.data;
  } catch (e) {
    handleError(e, "Failed to fetch User devices.");
    throw e;
  }
};

export const userDeviceDelete = async (userId: string, id: string) => {
  try {
    await authAxios.delete(
      `${contextPath}/v1/user-app-notification-settings/user/${userId}/device/${id}`
    );
    LocalStorageCache.delete(LOCAL_STORAGE_USER_NOTIFICATION_DEVICES);
  } catch (e) {
    handleError(e, "Failed to fetch User devices.");
    throw e;
  }
};

export const enable2FA = async (userId: string) => {
  try {
    const res = await authAxios.put(
      `${contextPath}/v1/users/${userId}/enable2FA`
    );
    const userRaw = localStorage.getItem(LOCAL_STORAGE_USER);
    if (userRaw) {
      const user = JSON.parse(userRaw);
      user.twoFAEnabled = true;
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
    }
    return res.data;
  } catch (e) {
    handleError(e, "Failed to update 2FA");
    throw e;
  }
};

export const disable2FA = async (userId: string) => {
  try {
    await authAxios.put(`${contextPath}/v1/users/${userId}/disable2FA`);
    const userRaw = localStorage.getItem(LOCAL_STORAGE_USER);
    if (userRaw) {
      const user = JSON.parse(userRaw);
      user.twoFAEnabled = false;
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
    }
  } catch (e) {
    handleError(e, "Failed to update 2FA");
    throw e;
  }
};

export const fetchUserActivities = async (
  userId: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/userActivity/${userId}`,
      {
        params: {
          pageNo: page + 1,
          pageSize,
          sortBy,
          sortDirection,
        },
      }
    );
    return result.data;
  } catch (e) {
    handleError(e, "Failed to load user activities.");
    throw e;
  }
};

export const fetchAllUserNotifications = async (
  userId: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/notifications/${userId}`,
      {
        params: {
          pageNo: page + 1,
          pageSize,
          sortBy,
          sortDirection,
        },
      }
    );
    return result.data;
  } catch (e) {
    handleError(e, "Failed to load user activities.");
    throw e;
  }
};

export const updateUserRoles = async (userId: string, roles: string[]) => {
  try {
    await authAxios.put(`${contextPath}/v1/users/${userId}/updateRoles`, {
      roles,
    });
  } catch (e) {
    handleError(e, "Failed to Update User Roles");
    throw e;
  }
};

export const updateUserStatus = async (userId: string, status: string) => {
  try {
    await authAxios.put(`${contextPath}/v1/users/${userId}/status/${status}`);
  } catch (e) {
    handleError(e, "Failed to update User Status");
    throw e;
  }
};

export const fetchUsers = async (
  rsql: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(`${contextPath}/v1/users`, {
      params: {
        rsql,
        pageNo: page + 1,
        pageSize,
        sortBy,
        sortDirection,
      },
    });
    return result.data;
  } catch (e) {
    handleError(e, "Failed to load user activities.");
    throw e;
  }
};

export const unblockUser = async (userId: string) => {
  try {
    await authAxios.put(`${contextPath}/v1/users/${userId}/unblockUserLogin`);
  } catch (e) {
    handleError(e, "Failed to update User Status");
    throw e;
  }
};

export const createTicket = async (values: CreateTicketFormValues) => {
  try {
    await authAxios.post(`${contextPath}/v1/customerSupportTickets`, {
      message: values.message,
    });
  } catch (e) {
    handleError(e, "Failed to create ticket");
    throw e;
  }
};

export const updateTicket = async (
  id: string,
  data: UpdateTicketFormValues
) => {
  try {
    await authAxios.put(
      `${contextPath}/v1/customerSupportTickets/${id}/update`,
      data
    );
  } catch (e) {
    handleError(e, "Failed to update ticket");
    throw e;
  }
};

export const assignTicket = async (id: string, userId: string) => {
  try {
    await authAxios.put(
      `${contextPath}/v1/customerSupportTickets/${id}/assign/${userId}`
    );
  } catch (e) {
    handleError(e, "Failed to assign ticket");
    throw e;
  }
};

export const fetchUserTickets = async (
  userId: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/customerSupportTickets/users/${userId}`,
      {
        params: {
          pageNo: page + 1,
          pageSize,
          sortBy,
          sortDirection,
        },
      }
    );
    return result.data;
  } catch (e) {
    handleError(e, "Failed to Fetch ticket");
    throw e;
  }
};

export const fetchTickets = async (
  rsql: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/customerSupportTickets`,
      {
        params: {
          rsql,
          pageNo: page + 1,
          pageSize,
          sortBy,
          sortDirection,
        },
      }
    );
    return result.data;
  } catch (e) {
    handleError(e, "Failed to Fetch ticket");
    throw e;
  }
};

export const ticketsSummary = async (fromDate: Date, toDate: Date) => {
  try {
    const res = await authAxios.get(
      `${contextPath}/v1/customerSupportTickets/summary`,
      {
        params: {
          startDate: formatISO(fromDate),
          endDate: formatISO(toDate),
        },
      }
    );
    return res.data;
  } catch (e) {
    handleError(e, "Failed to tickets summary");
    throw e;
  }
};
