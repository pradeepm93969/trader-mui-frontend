export const LOGIN_URL = "/auth/login";
export const DASHBOARD_URL = "/dashboard";

export const LOCAL_STORAGE_ACCESS_TOKEN = "accessToken";
export const LOCAL_STORAGE_USER_ID = "userId";
export const LOCAL_STORAGE_FIRST_NAME = "firstName";
export const LOCAL_STORAGE_USER = "user";
export const LOCAL_STORAGE_2FA = "2FA";
export const LOCAL_STORAGE_EXCHANGES = "EXCHANGES";
export const LOCAL_STORAGE_OPERATORS = "OPERATORS";
export const LOCAL_STORAGE_INDICATORS = "INDICATORS";
export const LOCAL_STORAGE_INTERVALS = "INTERVALS";
export const LOCAL_STORAGE_PERIODS = "PERIODS";
export const LOCAL_STORAGE_UNREAD_NOTIFICATIONS_COUNT =
  "UNREAD_NOTIFICATIONS_COUNT";
export const LOCAL_STORAGE_USER_NOTIFICATIONS = "USER_NOTIFICATIONS";
export const LOCAL_STORAGE_USER_NOTIFICATION_DEVICES =
  "USER_NOTIFICATION_DEVICES";
export const LOCAL_STORAGE_PRICING_PLANS = "PRICING_PLANS";

export const TICKET_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  OPEN: { color: "#FACC15", bgClass: "bg-yellow-400" }, // yellow-400
  ASSIGNED: { color: "#3B82F6", bgClass: "bg-blue-500" }, // blue-500
  INPROGRESS: { color: "#FB923C", bgClass: "bg-orange-400" }, // orange-400
  CLOSED: { color: "#22C55E", bgClass: "bg-green-500" }, // green-500
};

export const TICKET_STATUS_ORDER = ["OPEN", "ASSIGNED", "INPROGRESS", "CLOSED"];

export const TICKET_PRIORITY_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  HIGH: { color: "#DC2626", bgClass: "bg-red-600" },
  MEDIUM: { color: "#D97706", bgClass: "bg-amber-600" },
  LOW: { color: "#16A34A", bgClass: "bg-green-600" },
};

export const TICKET_PRIORITY_ORDER = ["HIGH", "MEDIUM", "LOW"];

export const PLAN_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  FREE: {
    color: "#3B82F6", // blue-500
    bgClass:
      "bg-gradient-to-r from-blue-700 via-blue-500 via-sky-400 to-cyan-300",
  },
  BRONZE: {
    color: "#D97706", //amber-500
    bgClass:
      "bg-gradient-to-r from-yellow-900 via-yellow-700 via-yellow-600 to-amber-400",
  },
  SILVER: {
    color: "#6B7280", // gray-500
    bgClass:
      "bg-gradient-to-r from-gray-500 via-gray-400 via-gray-300 to-slate-200",
  },
  GOLD: {
    color: "#EAB308", // yellow-500
    bgClass:
      "bg-gradient-to-r from-yellow-400 via-yellow-300 via-amber-200 to-amber-100",
  },
};

export const PRICING_PLANS_ORDER = ["FREE", "BRONZE", "SILVER", "GOLD"];

export const PROMOTION_STATUS = ["ACTIVE", "INACTIVE"];

export const PROMOTION_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  ACTIVE: { color: "#16A34A", bgClass: "bg-green-600" },
  INACTIVE: { color: "#6B7280", bgClass: "bg-gray-500" },
};

export const PROMOTION_TYPE = ["AMOUNT", "PERCENTAGE"];

export const PAYMENT_GATEWAYS = ["STRIPE", "COINIFY", "ETHAX", "APPLE"];

export const PAYMENT_GATEWAYS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  STRIPE: { color: "#2563EB", bgClass: "bg-blue-600" }, // blue-600
  COINIFY: { color: "#16A34A", bgClass: "bg-green-600" }, // green-600
  ETHAX: { color: "#0D9488", bgClass: "bg-primary" }, // teal-600
  FREE_TRIAL: { color: "#4B5563", bgClass: "bg-gray-600" }, // gray-600
  APPLE: { color: "#000000", bgClass: "bg-black" }, // gray-600
};

export const SUBSCRIPTION_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  ACTIVE: { color: "#16A34A", bgClass: "bg-green-600" },
  EXPIRED: { color: "#6B7280", bgClass: "bg-gray-500" },
};

export const TRANSACTION_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  INITIATED: { color: "#2563EB", bgClass: "bg-blue-600" },
  PROCESSING: { color: "#D97706", bgClass: "bg-amber-600" },
  SUCCESS: { color: "#16A34A", bgClass: "bg-green-600" },
  FAILED: { color: "#DC2626", bgClass: "bg-red-600" },
  CANCELLED: { color: "#6B7280", bgClass: "bg-gray-600" },
};

export const EXCHANGE_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  PUBLIC: { color: "#16A34A", bgClass: "bg-green-600" },
  PRIVATE: { color: "#2563EB", bgClass: "bg-blue-600" },
  DISABLED: { color: "#6B7280", bgClass: "bg-gray-500" },
};

export const EXCHANGE_STATUS_ORDER = ["PUBLIC", "PRIVATE", "DISABLED"];

export const EXCHANGE_USER_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  CONNECTED: { color: "#16A34A", bgClass: "bg-green-600" },
  DISCONNECTED: { color: "#DC2626", bgClass: "bg-red-500" },
};

export const ALGORITHM_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  ACTIVE: { color: "#16A34A", bgClass: "bg-green-600" },
  INACTIVE: { color: "#6B7280", bgClass: "bg-gray-500" },
};

export const STRATEGY_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  PUBLIC: { color: "#16A34A", bgClass: "bg-green-600" },
  PRIVATE: { color: "#2563EB", bgClass: "bg-blue-600" },
  DISABLED: { color: "#6B7280", bgClass: "bg-gray-500" },
};

export const STRATEGY_TYPES_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  SIMPLE: { color: "#16A34A", bgClass: "bg-green-600" },
  SCHEDULED: { color: "#2563EB", bgClass: "bg-blue-600" },
};

export const STRATEGY_AUTOMATION_STATUS_ORDER = [
  "NEW",
  "STARTED",
  "COMPLETED",
  "CANCELLED",
  "STOPPED",
];

export const STRATEGY_AUTOMATION_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  NEW: { color: "#F59E0B", bgClass: "bg-yellow-500" },
  STARTED: { color: "#3B82F6", bgClass: "bg-blue-600" },
  CANCELLED: { color: "#EF4444", bgClass: "bg-red-600" },
  STOPPED: { color: "#6B7280", bgClass: "bg-gray-500" },
  COMPLETED: { color: "#10B981", bgClass: "bg-green-600" },
};

export const STRATEGY_AUTOMATION_INSTANCE_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  NEW: { color: "#F59E0B", bgClass: "bg-yellow-500" }, // amber/yellow (same as your NEW)
  OPEN: { color: "#3B82F6", bgClass: "bg-blue-600" }, // blue for active/open (similar to STARTED)
  CLOSED: { color: "#10B981", bgClass: "bg-green-600" }, // green for closed/success (similar to COMPLETED)
  CANCELLED: { color: "#EF4444", bgClass: "bg-red-600" }, // red for cancelled (same as your CANCELLED)
  STOPPED: { color: "#6B7280", bgClass: "bg-gray-500" }, // gray for stopped (same as your STOPPED)
};

export const ORDER_STATUS_STYLES: Record<
  string,
  { color: string; bgClass: string }
> = {
  FILLED: { color: "#10B981", bgClass: "bg-green-600" }, // green for filled/success
  REJECTED: { color: "#EF4444", bgClass: "bg-red-600" }, // red for rejected/error
};
