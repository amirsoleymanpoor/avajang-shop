export type CartLine = {
  slug: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  emoji: string;
  gradient: string;
  qty: number;
};

export type CheckoutPayload = {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  lines: CartLine[];
};

export const ORDER_STATUS = ["pending", "paid", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت شده",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export type Spec = { label: string; value: string };