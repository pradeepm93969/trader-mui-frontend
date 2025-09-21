import * as z from "zod";

export const PricingPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  planType: z.string(),
  status: z.string(),
  price: z.number(),
  durationInMonths: z.number(),
  noOfAutomatedStrategyAllowed: z.number(),
});
export type PricingPlan = z.infer<typeof PricingPlanSchema>;

export const PricingPlansEnum = z.enum(["FREE", "BRONZE", "SILVER", "GOLD"]);
export type PricingPlansEnum = z.infer<typeof PricingPlansEnum>;

export const PaymentGatewaysEnum = z.enum([
  "FREE_TRIAL",
  "STRIPE",
  "COINIFY",
  "ETHAX",
]);
export type PaymentGatewaysEnum = z.infer<typeof PaymentGatewaysEnum>;

// Promotion Schema
export const PromotionSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(5).max(60),
  couponCode: z.string().min(5).max(60),
  pricingPlans: z.array(z.string()).nonempty(),
  userId: z.string().optional().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  promotionType: z.enum(["PERCENTAGE", "AMOUNT"]),
  value: z.number().positive(),
  paymentGateways: z.array(PaymentGatewaysEnum).nonempty(),
  startDate: z.date(),
  endDate: z.date(),
});
export type Promotion = z.infer<typeof PromotionSchema>;

export const SubscriptionSchema = z.object({
  id: z.string().optional().nullable(),
  userId: z.string(),
  pricingPlanId: z.string(),
  paymentTransactionId: z.string(),
  subscriptionStatus: z.enum(["ACTIVE", "EXPIRED"]),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional().nullable(),
});
export type Subscription = z.infer<typeof SubscriptionSchema>;

export const PaymentTransactionSchema = z.object({
  id: z.string().optional().nullable(),
  transactionStatus: z.enum([
    "INITIATED",
    "PROCESSING",
    "SUCCESS",
    "FAILED",
    "CANCELLED",
  ]),
  amount: z.number(), // BigDecimal → number, with validation
  userId: z.string(),
  pricingPlan: PricingPlanSchema,
  promotion: PromotionSchema.optional().nullable(),
  paymentGateway: PaymentGatewaysEnum.optional().nullable(), // adjust values
  paymentUrl: z.string().optional().nullable(),
  tokenId: z.string().optional().nullable(),
  clientSecret: z.string().optional().nullable(),
  ethaxTokens: z.number().nonnegative(),
  senderWallet: z.string().optional().nullable(),
});

export type PaymentTransaction = z.infer<typeof PaymentTransactionSchema>;
