/* eslint-disable @typescript-eslint/no-explicit-any */
import { authAxios } from "@/actions/axiosClient";
import { isAxiosError } from "axios";
import { toastError } from "@/components/ui/toast";
import LocalStorageCache from "@/lib/LocalStorageCache";
import {
  LOCAL_STORAGE_PRICING_PLANS,
  LOCAL_STORAGE_USER_ID,
} from "@/lib/constants";
import { PricingPlan, Promotion } from "@/schemas";
import { formatISO } from "date-fns";

const contextPath = "/subscription-service";
const cacheTime = 5 * 60 * 1000;

/**
 * Common error handler for the service
 */
const handleError = (e: unknown, fallbackMessage: string) => {
  let message = fallbackMessage;
  if (isAxiosError(e) && e.response && e.response.data) {
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

export const fetchPricingPlans = async () => {
  const pricingPlans = LocalStorageCache.get<PricingPlan[]>(
    LOCAL_STORAGE_PRICING_PLANS
  );
  if (pricingPlans) {
    return pricingPlans;
  }
  try {
    const result = await authAxios.get(`${contextPath}/v1/pricingPlans`);
    LocalStorageCache.put(
      LOCAL_STORAGE_PRICING_PLANS,
      result.data.content,
      cacheTime
    );
    return result.data.content;
  } catch (e) {
    handleError(e, "Failed to Fetch Subscription");
    throw e;
  }
};

export const fetchUserSubscriptions = async (
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/subscriptions/users/${localStorage.getItem(
        LOCAL_STORAGE_USER_ID
      )}`,
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
    handleError(e, "Failed to Fetch Subscription");
    throw e;
  }
};

export const fetchSubscriptions = async (
  rsql: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(`${contextPath}/v1/subscriptions`, {
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
    handleError(e, "Failed to Fetch Subscription");
    throw e;
  }
};

export const fetchTransaction = async (transactionId: string) => {
  try {
    const res = await authAxios.get(
      `${contextPath}/v1/transactions/users/${localStorage.getItem(
        LOCAL_STORAGE_USER_ID
      )}/${transactionId}`
    );
    return res.data;
  } catch (e) {
    handleError(e, "Failed to fetch transaction.");
    throw e;
  }
};

export const applyPromoCode = async (promoCode: string, planId: string) => {
  try {
    const res = await authAxios.get(
      `${contextPath}/v1/promotions/${promoCode}/apply/${planId}`
    );
    return res.data;
  } catch (e) {
    handleError(e, "Failed to apply code.");
    throw e;
  }
};

export const initiatePayment = async (payload: any) => {
  try {
    const res = await authAxios.post(
      `${contextPath}/v1/transactions/users/${localStorage.getItem(
        LOCAL_STORAGE_USER_ID
      )}/initiate`,
      payload
    );
    return res.data;
  } catch (e) {
    handleError(e, "Failed to initiate payment.");
    throw e;
  }
};

export const subscriptionsSummary = async (fromDate: Date, toDate: Date) => {
  try {
    const res = await authAxios.get(`${contextPath}/v1/subscriptions/summary`, {
      params: {
        startDate: formatISO(fromDate),
        endDate: formatISO(toDate),
      },
    });
    return res.data;
  } catch (e) {
    handleError(e, "Failed to fetch subscriptions summary");
    throw e;
  }
};

export const inactivateSubscription = async (subscriptionId: string) => {
  try {
    await authAxios.put(
      `${contextPath}/v1/subscriptions/${subscriptionId}/inactivate`
    );
  } catch (e) {
    handleError(e, "Failed to apply code.");
    throw e;
  }
};

export const fetchPromotions = async (
  rsql: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(`${contextPath}/v1/promotions`, {
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
    handleError(e, "Failed to Fetch Subscription");
    throw e;
  }
};

export const createPromotion = async (promotion: Promotion) => {
  try {
    await authAxios.post(`${contextPath}/v1/promotions`, promotion);
  } catch (e) {
    handleError(e, "Failed to create Promotion");
    throw e;
  }
};

export const updatePromotion = async (row: Promotion) => {
  try {
    await authAxios.put(`${contextPath}/v1/promotions/${row.id}`, row);
  } catch (e) {
    handleError(e, "Failed to update Promotion");
    throw e;
  }
};

export const fetchStripePublishableKey = async () => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/transactions/stripe/publishable-key`
    );
    return result.data;
  } catch (e) {
    handleError(e, "Failed to fetch Stripe key");
    throw e;
  }
};

export const UpdateSenderWallet = async (
  id: string,
  senderWallet: string
): Promise<void> => {
  try {
    await authAxios.put(`${contextPath}/v1/transactions/${id}/senderWallet`, {
      senderWallet,
    });
  } catch (e) {
    handleError(e, "Failed to update sender wallet.");
    throw e;
  }
};
