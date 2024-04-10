"use client";

import { useMemo, useState } from "react";
import { WillCreationType } from "@prisma/client";
import {
  PaymentElement,
  useElements,
  useStripe,
  ExpressCheckoutElement,
} from "@stripe/react-stripe-js";
import { Button } from "~/components/ui/button";
import type {
  PaymentIntentInput,
  PaymentIntentResponseBody,
} from "~/app/api/billing/payment-intent/types";
import {
  CreateSubscriptionInput,
  CreateSubscriptionResponseBody,
} from "~/app/api/billing/subscription/types";
import { useSubmit } from "~/hooks/useSubmit";
import { generateCoupleCoupon } from "~/utils/coupons";
import { apiRoutes, routes } from "~/config/routes";
import { isCoupleProduct } from "~/utils/coupons";
import { trackDataLayer } from "~/libs/dataLayer";
import {
  getPurchaseTrackingData,
  getCheckoutUrlWithParams,
} from "~/utils/tracking";
import {
  SUBSCRIPTION_PRICE_PER_MONTH,
  getSubscriptionPaymentDate,
} from "./utils";

type Product = {
  id: string;
  name: string;
  description: string;
  priceId: string;
  amount: number;
};

type Props = {
  userId: string;
  willId: string;
  willType: WillCreationType;
  product: Product;
  hasSubscription: boolean;
  coupleCouponApplied: string | null;
  coupleCouponIdApplied: string | null;
  upfrontPaymentUnitAmount: number;
};

export function PaymentsForm({
  userId,
  willId,
  willType,
  product,
  hasSubscription,
  coupleCouponApplied,
  coupleCouponIdApplied,
  upfrontPaymentUnitAmount,
}: Props) {
  const [canSubmit, setCanSubmit] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string | null>(
    null
  );
  const [hasSentPaymentInfoEvent, setHasSentPaymentInfoEvent] = useState(false);
  const { apiFetch, loading, setLoading } = useSubmit();
  const elements = useElements();
  const stripe = useStripe();

  const paymentInfoEventData = useMemo(
    () =>
      getPurchaseTrackingData({
        userId,
        coupon: coupleCouponApplied,
        value: upfrontPaymentUnitAmount / 100,
        items: [
          {
            item_name: product.name,
            item_category: willType,
            price: product.amount,
            quantity: 1,
          },
        ],
      }),
    [coupleCouponApplied, product, upfrontPaymentUnitAmount, willType, userId]
  );

  const onClickExpressElement = ({ resolve }: { resolve: any }) => {
    trackDataLayer({
      event: "add_payment_info",
      data: paymentInfoEventData,
    });
    setHasSentPaymentInfoEvent(true);
    const options = {
      applePay: {
        recurringPaymentRequest: {
          paymentDescription: "Surewill Subscription",
          managementURL: "https://app.surewill.com.au",
          regularBilling: {
            amount: 10,
            label: "Monthly subscription fee",
            recurringPaymentIntervalUnit: "month",
          },
        },
      },
    };
    resolve(options);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!stripe || !elements) return null;
      setPaymentErrorMessage(null);
      const { error: elementsError } = await elements.submit();
      if (elementsError) {
        return setLoading(false);
      }

      let paymentIntent;
      const productIsCouple = isCoupleProduct(product);

      if (hasSubscription) {
        paymentIntent = await apiFetch<
          CreateSubscriptionResponseBody,
          CreateSubscriptionInput
        >(apiRoutes.billing.subscription, {
          method: "POST",
          payload: {
            willId,
            priceId: product.priceId,
            productId: product.id,
            coupleCouponGenerated: productIsCouple
              ? generateCoupleCoupon()
              : undefined,
            coupleCouponApplied: coupleCouponIdApplied || undefined,
          },
        });
      } else {
        paymentIntent = await apiFetch<
          PaymentIntentResponseBody,
          PaymentIntentInput
        >(apiRoutes.billing.paymentIntent, {
          method: "POST",
          payload: {
            willId,
            productId: product.id,
            priceId: product.priceId,
            coupleCouponGenerated: productIsCouple
              ? generateCoupleCoupon()
              : undefined,
            coupleCouponApplied: coupleCouponIdApplied || undefined,
          },
        });
      }

      if (!paymentIntent.success) {
        setPaymentErrorMessage("Unable to start payment");
        return setLoading(false);
      }

      let returnUrl = getCheckoutUrlWithParams({
        baseUrl: `${window.location.origin}${routes.dashboard.billing.checkoutComplete}`,
        productName: product.name,
        willType,
      });
      if (paymentIntent.data.coupleCouponGenerated) {
        returnUrl += `&coupleCouponGenerated=${paymentIntent.data.coupleCouponGenerated}`;
      }
      if (coupleCouponApplied) {
        returnUrl += `&coupleCouponApplied=${coupleCouponApplied}`;
      }

      const stripeConfirmInput = {
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      };

      // There will be a paymentSetupClientSecret if the first payment is zero (e.g. coupon applied to Individual Will)
      // Otherwise there will be a regular paymentIntent clientSecret
      if (paymentIntent?.data.paymentSetupClientSecret) {
        const { error } = await stripe.confirmSetup({
          ...stripeConfirmInput,
          clientSecret: paymentIntent.data.paymentSetupClientSecret,
        });
        if (error) {
          setPaymentErrorMessage(error?.message || "Unable to confirm payment");
          setLoading(false);
        }
      } else if (paymentIntent?.data?.clientSecret) {
        const { error } = await stripe.confirmPayment({
          ...stripeConfirmInput,
          clientSecret: paymentIntent.data.clientSecret,
        });
        if (error) {
          setPaymentErrorMessage(error?.message || "Unable to confirm payment");
          setLoading(false);
        }
      } else {
        setPaymentErrorMessage("Unable to confirm payment");
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setPaymentErrorMessage(
        error?.message || "Your payment failed. Please try again."
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlePayment();
  };

  return (
    <>
      <h3 className="mb-6 text-xl">Payment Method</h3>
      <form onSubmit={handleSubmit}>
        <ExpressCheckoutElement
          className="mb-8"
          onConfirm={handlePayment}
          onClick={onClickExpressElement}
        />
        <PaymentElement
          id="payment-element"
          className="mb-4"
          onReady={() => setCanSubmit(true)}
          onChange={() => {
            if (!hasSentPaymentInfoEvent && canSubmit) {
              trackDataLayer({
                event: "add_payment_info",
                data: paymentInfoEventData,
              });
              setHasSentPaymentInfoEvent(true);
            }
          }}
        />
        {hasSubscription && (
          <p className="mb-4 text-brand-gray">
            Your plan of ${SUBSCRIPTION_PRICE_PER_MONTH} per month will be
            charged automatically starting {getSubscriptionPaymentDate()}.
          </p>
        )}
        <Button
          className="mt-2 w-full"
          loading={loading}
          disabled={!canSubmit || !stripe || !elements}
        >
          <div className="flex w-full justify-center">
            Pay ${upfrontPaymentUnitAmount / 100}
            {hasSubscription && " + Subscribe"}
          </div>
        </Button>
        {paymentErrorMessage && (
          <p className="mt-4 text-error">{paymentErrorMessage}</p>
        )}
      </form>
    </>
  );
}
