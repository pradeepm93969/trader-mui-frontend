import * as z from "zod";

export const ExchangeSchema = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  imageUrl: z.string().nonempty(),
  status: z.enum(["PUBLIC", "PRIVATE", "INACTIVE"]),
});
export type Exchange = z.infer<typeof ExchangeSchema>;

export const ExchangeUserSchema = z.object({
  id: z.string().optional().nullable(),
  userId: z.string(),
  exchangeId: z.string().nonempty(),
  name: z.string().nonempty(),
  status: z.enum(["CONNECTED", "DISCONNECTED"]),
  apiKey: z.string().nonempty(),
  secretKey: z.string().nonempty(),
});

export type ExchangeUser = z.infer<typeof ExchangeUserSchema>;

export type Wallet = {
  total: {
    usdt: number;
    btc: number;
    eth: number;
    bnb: number;
  };
  coins: {
    name: string;
    image: string;
    amount: number;
    price: number;
    change24hr: number;
    total: number;
  }[];
};

export const currencyOptions = ["USDT", "BTC", "ETH"];
