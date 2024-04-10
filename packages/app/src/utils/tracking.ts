import { WillCreationType } from "@prisma/client";

export type PurchaseItem = {
  item_name: string;
  item_category: string;
  price: number;
  quantity: number;
  coupon?: string;
};

const formatMonetaryValue = (value: number) => parseFloat(value.toFixed(2));

export const getPurchaseTrackingData = ({
  userId,
  value,
  coupon,
  items,
}: {
  userId: string;
  value: number;
  coupon?: string | null;
  items: PurchaseItem[];
}) => {
  const formattedItems = items.map((item) => ({
    ...item,
    price: formatMonetaryValue(item.price),
    coupon: coupon || undefined,
  }));
  return {
    transaction_id: userId,
    value: formatMonetaryValue(value),
    currency: "AUD",
    coupon,
    items: formattedItems,
  };
};

export type PurchaseTrackingData = ReturnType<typeof getPurchaseTrackingData>;

export const getCheckoutUrlWithParams = ({
  baseUrl,
  productName,
  willType,
}: {
  baseUrl: string;
  productName: string;
  willType: WillCreationType;
}) => {
  return `${baseUrl}?product=${encodeURIComponent(
    productName
  )}&willType=${willType}`;
};
