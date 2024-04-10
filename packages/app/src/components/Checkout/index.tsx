"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WillCreationType } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { getStripe } from "~/libs/stripe";
import { getTotalUnitAmountWithCoupon } from "~/utils/coupons";
import { trackDataLayer } from "~/libs/dataLayer";
import { getCheckoutUrl } from "~/utils/checkout";
import { ProductOption } from "./ProductOption";
import { PaymentsForm } from "./PaymentsForm";
import { StorageSubscription } from "./StorageSubscription";
import { ApplyCoupon } from "./ApplyCoupon";
import { FreeCheckout } from "./FreeCheckout";

const stripe = getStripe();

type Product = {
  id: string;
  name: string;
  description: string;
  priceId: string;
  amount: number;
  unitAmount: number; // amount * 100
};

type Props = {
  userId: string;
  willId: string;
  willType: WillCreationType;
  productsToDisplay: Product[];
  hadError: boolean;
};

export function Checkout({
  userId,
  willId,
  willType,
  productsToDisplay,
  hadError,
}: Props) {
  const { replace } = useRouter();
  const [partnerCouponApplied, setPartnerCouponApplied] = useState<{
    id: string;
    code: string;
  } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    productsToDisplay[0]
  );
  const [paymentMode, setPaymentMode] = useState<"payment" | "subscription">(
    "payment"
  );

  const isPurchaseFree = useMemo(() => {
    const hasSelectedSingle = selectedProduct.name
      .toLowerCase()
      .includes("individual");
    if (
      partnerCouponApplied &&
      hasSelectedSingle &&
      paymentMode === "payment"
    ) {
      return true;
    }
    return false;
  }, [partnerCouponApplied, selectedProduct, paymentMode]);

  const upfrontPaymentUnitAmount = useMemo(
    () =>
      getTotalUnitAmountWithCoupon(
        selectedProduct.unitAmount,
        !!partnerCouponApplied
      ),
    [selectedProduct, partnerCouponApplied]
  );

  useEffect(() => {
    if (hadError) {
      replace(getCheckoutUrl(willType)); // remove the ?hadError=true URL param
      toast.error("Your payment failed, please try another payment method.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track this event when user lands on this page
  useEffect(() => {
    trackDataLayer({ event: "begin_checkout" });
  }, []);

  return (
    <>
      <h3 className="text-xl">Payment Option</h3>
      <p className="mb-6 text-brand-gray">
        Make your payment to download your Will instantly.
      </p>
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        {productsToDisplay.map((product) => (
          <ProductOption
            key={product.name}
            name={product.name}
            description={product.description}
            amount={product.amount}
            isSelected={product.priceId === selectedProduct.priceId}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      <StorageSubscription
        hasSubscription={paymentMode === "subscription"}
        onChecked={(checked: boolean) => {
          if (checked) {
            setPaymentMode("subscription");
            trackDataLayer({ event: "storage_subscribe" });
          } else {
            setPaymentMode("payment");
            trackDataLayer({ event: "storage_unsubscribe" });
          }
        }}
      />
      <ApplyCoupon onApplyCoupon={setPartnerCouponApplied} />
      {isPurchaseFree ? (
        <FreeCheckout
          willId={willId}
          coupleCouponApplied={partnerCouponApplied?.code!}
          coupleCouponIdApplied={partnerCouponApplied?.id!}
          productName={selectedProduct.name}
          willType={willType}
        />
      ) : upfrontPaymentUnitAmount > 0 || paymentMode === "subscription" ? (
        <Elements
          key={paymentMode}
          stripe={stripe}
          options={{
            appearance: {
              variables: {
                colorPrimary: "#742183",
              },
            },
            mode: paymentMode,
            amount: upfrontPaymentUnitAmount,
            currency: "aud",
            setupFutureUsage:
              paymentMode === "subscription" ? "off_session" : undefined,
          }}
        >
          <PaymentsForm
            userId={userId}
            willId={willId}
            willType={willType}
            product={selectedProduct}
            hasSubscription={paymentMode === "subscription"}
            coupleCouponApplied={partnerCouponApplied?.code || null}
            coupleCouponIdApplied={partnerCouponApplied?.id || null}
            upfrontPaymentUnitAmount={upfrontPaymentUnitAmount}
          />
        </Elements>
      ) : null}
    </>
  );
}
