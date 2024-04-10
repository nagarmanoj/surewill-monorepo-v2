export const generateCoupleCoupon = () => {
  return Math.random().toString(36).slice(2, 11).toUpperCase();
};

export const isCoupleProduct = (product: { name: string }) => {
  return product.name.toLowerCase().includes("couple");
};

// This value should be the same as the price of the Individual product in Stripe
export const COUPLE_COUPLE_AMOUNT = 120;

export const getTotalUnitAmountWithCoupon = (
  baseUnitAmount: number,
  hasPartnerCoupon: boolean
) => {
  if (hasPartnerCoupon) {
    const reducedPrice = baseUnitAmount - COUPLE_COUPLE_AMOUNT * 100;
    return reducedPrice || 0;
  }
  return baseUnitAmount;
};
