import * as z from "zod";

export const IndicatorSchema = z.object({
  name: z.string(),
  params: z.record(z.any()),
  candleOffset: z.coerce.number().int().min(0),
});

export const RuleSchema = z.object({
  left: IndicatorSchema,
  operator: z.string(), // dynamically handled
  right: IndicatorSchema,
});

export const RuleGroupSchema = z.object({
  rulesSet: z.array(RuleSchema),
});

export const AlgorithmsSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(5).max(200),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  openingRulesGroup: z.array(RuleGroupSchema),
  closingRulesGroup: z.array(RuleGroupSchema),
});
export type Algorithm = z.infer<typeof AlgorithmsSchema>;

export type Operator = {
  name: string;
  symbol: string;
  description: string;
};

export type Indicator = {
  name: string;
  description: string;
  params: string[];
};

export const StrategySchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(5).max(60),
  exchangeId: z.string().nonempty(),
  pricingPlans: z.array(z.string()).nonempty(),
  strategyAlgorithmId: z.string().nonempty(),
  strategyAlgorithm: AlgorithmsSchema.optional().nullable(),
  quoteAmount: z.number(),
  symbol: z.string().nonempty(),
  interval: z.string().nonempty(), // add more as needed
  type: z.enum(["SIMPLE", "SCHEDULED"]), // adjust values if applicable
  status: z.enum(["PUBLIC", "PRIVATE", "DISABLED"]),
  noOfExecutions: z.number().positive(),
  takeProfitPercentage: z.number().positive().optional().nullable(),
  trailingProfitDropPercentage: z.number().positive().optional().nullable(),
  stopLossPercentage: z.number().positive().optional().nullable(),
  priceDropPercentage: z.number().positive().optional().nullable(),
  scheduledIntervalInMin: z.number().positive().optional().nullable(),
  period: z.enum([
    "ONE_MONTH",
    "TWO_MONTHS",
    "THREE_MONTHS",
    "FOUR_MONTHS",
    "FIVE_MONTHS",
    "SIX_MONTHS",
    "TWELVE_MONTHS",
  ]),
});

export type Strategy = z.infer<typeof StrategySchema>;

export type Period = {
  name: string;
  months: number;
};

export type Interval = {
  name: string;
  value: string;
};

export const CreateStrategyAutomationSchema = z.object({
  name: z.string().min(3).max(60),
  exchangeId: z.string().nonempty(),
  exchangeUserId: z.string().nonempty(),
  strategyId: z.string().nonempty(),
  delayedStartAt: z.date().nullable().optional(),
});
export type CreateStrategyAutomationModal = z.infer<
  typeof CreateStrategyAutomationSchema
>;

export interface StrategyAutomation {
  id?: string | null;
  name: string;
  exchangeId: string;
  exchangeUserId: string;
  strategyId: string;
  strategy: Strategy;
  status: "NEW" | "STARTED" | "CANCELLED" | "STOPPED" | "COMPLETED";
  noOfExecutions?: number | null;
  executionCounter?: number | null;
  nextExecutionAt?: string | null;
  delayedStartAt?: string | null;
  roiPercentage?: number | null;
  profit?: number | null;
  pnl?: number | null;
  maxOpenInstances?: number | null;
  remarks?: string | null;
  createdAt: string;
  updatedAt: string;
  strategyAutomationInstances: StrategyAutomationInstances;
}
export const StrategyAutomationStatus = z.enum([
  "NEW",
  "STARTED",
  "CANCELLED",
  "STOPPED",
  "COMPLETED",
]);

export interface StrategyAutomationInstances {
  content: StrategyAutomationInstance[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface StrategyAutomationInstance {
  id: string;
  strategyAutomationId: string;
  openingOrder?: Order | null;
  closingOrder?: Order | null;
  status: "NEW" | "OPEN" | "CLOSED" | "CANCELLED" | "STOPPED";
  roiPercentage?: number | null;
  profit?: number | null;
  highestProfitPercentage?: number | null;
  pnl: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  exchangeOrderId?: string | null;
  exchangeUserId: string;
  orderType: string;
  symbol: string;
  triggerType: string;
  status: "FILLED" | "REJECTED";
  marketPrice?: number | null;
  amount: number;
  total?: number | null;
  commission?: number | null;
  commissionAsset?: string | null;
  leverage?: number | null;
  rejectReason?: string | null;
}
