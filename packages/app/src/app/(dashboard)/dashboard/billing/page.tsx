import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { PaymentManagement } from "~/components/PaymentManagement";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { fetchWillWithBilling } from "~/utils/will";
import { routes } from "~/config/routes";
import { getCheckoutUrl } from "~/utils/checkout";

export default async function Billing() {
  const { userId } = auth();
  if (!userId) {
    redirect(routes.auth.signIn);
  }
  const will = await fetchWillWithBilling(userId);
  if (!will) {
    redirect(routes.dashboard.main);
  }

  if (will.status === "COMPLETE_UNPAID") {
    redirect(getCheckoutUrl(will.creationType));
  }

  if (will.status !== "COMPLETE_PAID") {
    redirect(routes.dashboard.main);
  }

  return (
    <div className="max-w-xl">
      <FormHeading>Billing</FormHeading>
      <PaymentManagement
        hasSubscription={!!will.billing?.stripeSubscriptionId}
      />
    </div>
  );
}
