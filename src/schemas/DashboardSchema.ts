import { StrategyAutomation } from "./AutomationSchema";

export interface SummaryResponse {
  exchangeUsersSummary: ExchangeUsersSummary;
  statusSummaries: StatusSummary[];
  profitsSummary: ProfitsByDay[];
}

export interface ExchangeUsersSummary {
  countOfConnected: number;
  countOfDisconnected: number;
}

export interface StatusSummary {
  status: StrategyAutomationStatusEnum;
  count: number;
  sumOfProfit: string; // BigDecimal is best represented as string to avoid JS float precision issues
}

export interface ProfitsByDay {
  date: string; // ISO date string, e.g., '2025-08-06'
  count: number;
  sumOfProfit: string; // Same as above
}

export type StrategyAutomationStatusEnum = StrategyAutomation["status"];
