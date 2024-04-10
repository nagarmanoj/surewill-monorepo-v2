import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { WillCreationType } from "@prisma/client";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { CheckoutSuccess } from "~/components/CheckoutSuccess";
import { stripe } from "~/libs/stripe-server";
import { getCheckoutUrl } from "~/utils/checkout";
import { getPurchaseTrackingData } from "~/utils/tracking";

type SearchParams = {
  coupleCouponApplied?: string;
  coupleCouponGenerated?: string;
  product: string;
  willType: WillCreationType;
  redirect_status: string;
} & (
  | {
      payment_intent: string;
      payment_intent_client_secret: string;
      setup_intent: never;
      setup_intent_client_secret: never;
    }
  | {
      setup_intent: string;
      setup_intent_client_secret: string;
      payment_intent: never;
      payment_intent_client_secret: never;
    }
);

export default async function CheckoutComplete({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { userId } = auth();
  const paymentOrSetupIntent = searchParams.payment_intent
    ? await stripe.paymentIntents.retrieve(searchParams.payment_intent)
    : await stripe.setupIntents.retrieve(searchParams.setup_intent);

  // Indicates a failed payment
  if (paymentOrSetupIntent.status === "requires_payment_method") {
    redirect(`${getCheckoutUrl(searchParams.willType)}?hadError=true`);
  }

  let paymentAmount = 0;
  if ("amount" in paymentOrSetupIntent) {
    paymentAmount = paymentOrSetupIntent.amount / 100;
  }

  const purchaseTrackingData = getPurchaseTrackingData({
    userId: userId as string,
    coupon: searchParams.coupleCouponApplied,
    value: paymentAmount,
    items: [
      {
        item_name: searchParams.product,
        item_category: searchParams.willType,
        price: paymentAmount,
        quantity: 1,
      },
    ],
  });

  switch (paymentOrSetupIntent.status) {
    case "succeeded":
      return (
        // @ts-expect-error Server Component
        <CheckoutSuccess
          paymentAmount={paymentAmount}
          hidePaymentText={!paymentAmount}
          purchaseTrackingData={purchaseTrackingData}
          coupleCouponGenerated={searchParams.coupleCouponGenerated}
        />
      );
    case "processing":
      return (
        <FormHeading>
          Your payment is processing. Please refresh your page in a few minutes.
        </FormHeading>
      );
    default:
      return <FormHeading>There was a problem with your payment.</FormHeading>;
  }
}
