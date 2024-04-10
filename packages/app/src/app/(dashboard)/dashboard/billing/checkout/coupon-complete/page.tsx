import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckoutSuccess } from "~/components/CheckoutSuccess";
import { routes } from "~/config/routes";
import { getPurchaseTrackingData } from "~/utils/tracking";
import { fetchWill } from "~/utils/will";

export default async function CheckoutWithCouponComplete({
  searchParams,
}: {
  searchParams: {
    coupleCouponApplied: string;
  };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect(routes.dashboard.main);
  }
  const will = await fetchWill(userId);
  const purchaseTrackingData = getPurchaseTrackingData({
    userId,
    value: 0,
    coupon: searchParams.coupleCouponApplied,
    items: [
      {
        item_name: "Individual", // this checkout page is specifically for Individual Wills paid with a coupon
        item_category: will?.creationType as string,
        price: 0,
        quantity: 1,
      },
    ],
  });

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <CheckoutSuccess
        paymentAmount={0}
        purchaseTrackingData={purchaseTrackingData}
        hidePaymentText
      />
    </div>
  );
}
