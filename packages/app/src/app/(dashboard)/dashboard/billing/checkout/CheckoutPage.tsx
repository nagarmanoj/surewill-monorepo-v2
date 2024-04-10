import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import Stripe from "stripe";
import { stripe } from "~/libs/stripe-server";
import { routes } from "~/config/routes";
import { Checkout } from "~/components/Checkout";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { fetchWill } from "~/utils/will";

export const dynamic = "force-dynamic";

type ProductWithPrice = Stripe.Product & { default_price: Stripe.Price };

export async function CheckoutPage({
  searchParams,
}: {
  searchParams: {
    hadError?: string;
  };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect(routes.auth.signIn);
  }

  const will = await fetchWill(userId);
  if (!will) {
    redirect(routes.dashboard.main);
  }

  if (will.status === "COMPLETE_PAID") {
    redirect(routes.dashboard.billing.main);
  }

  if (will.status === "IN_PROGRESS") {
    redirect(routes.dashboard.main);
  }

  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"], // expand to return products as type ProductWithPrice
  });

  const formattedProducts =
    products?.data
      ?.map(
        (product) => product as ProductWithPrice // extend the type as per the "expand" fields
      )
      ?.filter(
        (product) =>
          product.default_price?.type === "one_time" &&
          product?.default_price?.unit_amount !== null &&
          product?.default_price?.unit_amount > 0
      )
      ?.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || "",
        priceId: product?.default_price?.id,
        amount: (product?.default_price?.unit_amount as number) / 100,
        unitAmount: product?.default_price?.unit_amount as number,
      }))
      ?.filter((plan) => !!plan.priceId)
      ?.sort((a, b) => a.amount - b.amount) || [];

  return (
    <div className="max-w-xl">
      <FormHeading>Finalise your Will</FormHeading>
      <Checkout
        userId={userId}
        willId={will.id}
        willType={will.creationType}
        productsToDisplay={formattedProducts}
        hadError={searchParams.hadError === "true"}
      />
    </div>
  );
}
