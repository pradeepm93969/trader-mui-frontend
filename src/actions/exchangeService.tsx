/* eslint-disable @typescript-eslint/no-explicit-any */
import { authAxios } from "@/actions/axiosClient";
import { isAxiosError } from "axios";
import { toastError } from "@/components/ui/toast";
import LocalStorageCache from "@/lib/LocalStorageCache";
import {
  Algorithm,
  CreateStrategyAutomationModal,
  Exchange,
  ExchangeUser,
  Strategy,
} from "@/schemas";
import {
  LOCAL_STORAGE_EXCHANGES,
  LOCAL_STORAGE_INDICATORS,
  LOCAL_STORAGE_INTERVALS,
  LOCAL_STORAGE_OPERATORS,
  LOCAL_STORAGE_PERIODS,
} from "@/lib/constants";
import { formatISO } from "date-fns";

const contextPath = "/exchange-service";
const cacheTime = 5 * 60 * 1000;

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

// fetch exchanges
export const fetchExchanges = async () => {
  const cached = LocalStorageCache.get<Exchange[]>(LOCAL_STORAGE_EXCHANGES);
  if (cached) {
    return cached;
  }
  try {
    const result = await authAxios.get(`${contextPath}/v1/exchanges`);
    LocalStorageCache.put(LOCAL_STORAGE_EXCHANGES, result.data, cacheTime);
    return result.data;
  } catch (e) {
    handleError(e, "Failed to load exchanges.");
    throw e;
  }
};

export const updateExchange = async (id: string, data: any) => {
  try {
    await authAxios.put(`${contextPath}/v1/exchanges/${id}`, data);
    // Optional: clear cache if you want to invalidate it on update
    LocalStorageCache.delete(LOCAL_STORAGE_EXCHANGES);
    return { success: true };
  } catch (e) {
    handleError(e, "Failed to update exchange.");
    throw e;
  }
};

export const fetchExchangeUsers = async (
  userId: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: string,
  rsql: string
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/exchange-users/users/${userId}`,
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
    handleError(e, "Failed to fetch exchange users.");
    throw e;
  }
};

// 📄 Fetch Wallet
export const fetchWallet = async (id: string) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/exchange-users/${id}/wallet`
    );
    return result.data;
  } catch (e) {
    handleError(e, "Failed to fetch wallet.");
    throw e;
  }
};

// 📄 Connect Exchange User
export const connectExchangeUser = async (data: ExchangeUser) => {
  try {
    const { userId, exchangeId, name, apiKey, secretKey } = data;
    await authAxios.post(`/exchange-service/v1/exchange-users`, {
      userId,
      exchangeId,
      name,
      apiKey,
      secretKey,
    });
  } catch (e) {
    handleError(e, "Failed to create exchange user.");
    throw e;
  }
};

// 📄 Disconnect Exchange User
export const disconnectExchangeUser = async (id: string) => {
  try {
    await authAxios.delete(`/exchange-service/v1/exchange-users/${id}`);
  } catch (e) {
    handleError(e, "Failed to disconnect exchange user.");
    throw e;
  }
};

// 📄 Update Exchange User
export const updateExchangeUser = async (row: ExchangeUser) => {
  try {
    const { name, apiKey, secretKey } = row;
    await authAxios.put(`/exchange-service/v1/exchange-users/${row.id}`, {
      name,
      apiKey,
      secretKey,
    });
  } catch (e) {
    handleError(e, "Failed to update exchange user.");
    throw e;
  }
};

// fetch Algorithms
export const fetchAlgorithms = async (
  rsql: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/strategy-algorithms`,
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
    handleError(e, "Failed to Fetch Algorithms");
    throw e;
  }
};

export const fetchOperators = async () => {
  const cached = LocalStorageCache.get<Exchange[]>(LOCAL_STORAGE_OPERATORS);
  if (cached) {
    return cached;
  }
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/strategy-algorithms/operators`
    );
    LocalStorageCache.put(LOCAL_STORAGE_OPERATORS, result.data, cacheTime);
    return result.data;
  } catch (e) {
    handleError(e, "Failed to Fetch operators");
    throw e;
  }
};

export const fetchIndicators = async () => {
  const cached = LocalStorageCache.get<Exchange[]>(LOCAL_STORAGE_INDICATORS);
  if (cached) {
    return cached;
  }
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/strategy-algorithms/indicators`
    );
    LocalStorageCache.put(LOCAL_STORAGE_INDICATORS, result.data, cacheTime);
    return result.data;
  } catch (e) {
    handleError(e, "Failed to Fetch indicators");
    throw e;
  }
};

export const createAlgorithm = async (data: Algorithm) => {
  try {
    await authAxios.post(`${contextPath}/v1/strategy-algorithms`, data);
  } catch (e) {
    handleError(e, "Failed to create Algorithm");
    throw e;
  }
};

export const updateAlgorithm = async (data: Algorithm) => {
  try {
    await authAxios.put(
      `${contextPath}/v1/strategy-algorithms/${data.id}`,
      data
    );
  } catch (e) {
    handleError(e, "Failed to update Algorithm");
    throw e;
  }
};

// fetch strategies
export const fetchStrategies = async (
  rsql: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(`${contextPath}/v1/strategies`, {
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
    handleError(e, "Failed to load strategies.");
    throw e;
  }
};

export const fetchUserStrategies = async (exchangeId: string) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/strategies/exchanges/${exchangeId}`
    );
    return result.data;
  } catch (e) {
    handleError(e, "Failed to load strategies.");
    throw e;
  }
};

// fetch periods
export const fetchPeriods = async () => {
  const cached = LocalStorageCache.get<Exchange[]>(LOCAL_STORAGE_PERIODS);
  if (cached) {
    return cached;
  }
  try {
    const result = await authAxios.get(
      `/exchange-service/v1/strategies/periods`
    );
    LocalStorageCache.put(LOCAL_STORAGE_PERIODS, result.data, cacheTime);
    return result.data;
  } catch (e) {
    handleError(e, "Failed to load periods.");
    throw e;
  }
};

// fetch intervals
export const fetchIntervals = async () => {
  const cached = LocalStorageCache.get<Exchange[]>(LOCAL_STORAGE_INTERVALS);
  if (cached) {
    return cached;
  }
  try {
    const result = await authAxios.get(
      `/exchange-service/v1/strategies/intervals`
    );
    LocalStorageCache.put(LOCAL_STORAGE_INTERVALS, result.data, cacheTime);
    return result.data;
  } catch (e) {
    handleError(e, "Failed to load intervals.");
    throw e;
  }
};

export const createStrategy = async (data: Strategy) => {
  try {
    await authAxios.post(`${contextPath}/v1/strategies`, data);
  } catch (e) {
    handleError(e, "Failed to create Strategy");
    throw e;
  }
};

export const updateStrategy = async (data: Strategy) => {
  try {
    await authAxios.put(`${contextPath}/v1/strategies/${data.id}`, data);
  } catch (e) {
    handleError(e, "Failed to update Strategy");
    throw e;
  }
};

export const fetchStrategyAutomationsByUserId = async (
  userId: string,
  rsql: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/strategy-automations/users/${userId}`,
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
    handleError(e, "Failed to load strategy automations");
    throw e;
  }
};

export const fetchStrategyAutomations = async (
  userId: string,
  rsql: string,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDirection: "asc" | "desc"
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/strategy-automations`,
      {
        params: {
          userId,
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
    handleError(e, "Failed to load strategy automations");
    throw e;
  }
};

export const CreateStrategyAutomation = async (
  data: CreateStrategyAutomationModal
) => {
  try {
    await authAxios.post(`${contextPath}/v1/strategy-automations`, data);
  } catch (e) {
    handleError(e, "Failed to create strategy automation");
    throw e;
  }
};

export const fetchStrategyAutomationById = async (
  id: string,
  page: number,
  pageSize: number,
  fetchOnlyOpenInstances: boolean
) => {
  try {
    const result = await authAxios.get(
      `${contextPath}/v1/strategy-automations/${id}/details`,
      {
        params: {
          pageNo: page + 1,
          pageSize,
          fetchOnlyOpenInstances,
        },
      }
    );
    return result.data;
  } catch (e) {
    handleError(e, "Failed to load strategy automations");
    throw e;
  }
};

export const cancelStrategyAutomationInstanceById = async (
  automationId: string,
  id: string
) => {
  try {
    return await authAxios.delete(
      `${contextPath}/v1/strategy-automations/${automationId}/instances/${id}`
    );
  } catch (e) {
    handleError(e, "Failed to cancel strategy automation instance");
    throw e;
  }
};

export const cancelStrategyAutomationById = async (automationId: string) => {
  try {
    return await authAxios.delete(
      `${contextPath}/v1/strategy-automations/${automationId}`
    );
  } catch (e) {
    handleError(e, "Failed to cancel strategy automation");
    throw e;
  }
};

export const fetchDashboardSummary = async (
  userId: string,
  exchangeId: string | null,
  startDate: Date,
  endDate: Date
) => {
  try {
    const res = await authAxios.get(
      `${contextPath}/v1/summary/users/${userId}`,
      {
        params: {
          exchangeId,
          startDate: formatISO(startDate),
          endDate: formatISO(endDate),
        },
      }
    );
    return res.data;
  } catch (e) {
    handleError(e, "Failed to load dashboard data");
    throw e;
  }
};
