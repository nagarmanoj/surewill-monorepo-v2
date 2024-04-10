import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { currentUser } from "@clerk/nextjs";
import { routes } from "~/config/routes";
import { NextSteps } from "~/components/NextSteps";
import { InvitePartner } from "~/components/InvitePartner";
import type { PurchaseTrackingData } from "~/utils/tracking";
import { fetchWillWithPeople } from "~/utils/will";
import { FormHeading } from "../will-forms/components/FormHeading";
import { TrackPurchaseEvent } from "./TrackPurchaseEvent";
import { DownloadWill } from "./DownloadWill";

const TrustPilotWidget = dynamic(
  () => import("~/components/TrustPilotWidget"),
  {
    ssr: false,
  }
);

type Props = {
  paymentAmount?: number;
  coupleCouponGenerated?: string;
  hidePaymentText: boolean;
  stripeIntentId?: string;
  purchaseTrackingData: PurchaseTrackingData;
};

export async function CheckoutSuccess({
  paymentAmount,
  coupleCouponGenerated,
  hidePaymentText = false,
  purchaseTrackingData,
}: Props) {
  const user = await currentUser();
  if (!user) {
    redirect(routes.auth.signIn);
  }
  const will = await fetchWillWithPeople(user.id);
  if (!will) {
    return redirect(routes.dashboard.main);
  }

  const partnerName = will.people.find(
    (person) => person.category === "PARTNER"
  )?.fullName;

  return (
    <>
      <div className="max-w-2xl">
        <FormHeading>Congratulations, {will.firstName}!</FormHeading>
        {!hidePaymentText && paymentAmount ? (
          <h4 className="mb-4 text-xl font-semibold">
            Your payment of ${paymentAmount} was successful.
          </h4>
        ) : null}
        <DownloadWill
          willId={will.id}
          isReadyForDownload={!!will.firstGeneratedAt}
          email={user.emailAddresses?.[0]?.emailAddress}
        />
        {coupleCouponGenerated && (
          <InvitePartner
            coupleCoupon={coupleCouponGenerated}
            partnerName={partnerName || ""}
            willOwnerName={`${will.firstName} ${will.lastName}`}
          />
        )}
        <NextSteps />
        <TrustPilotWidget
          email={user.emailAddresses?.[0]?.emailAddress}
          name={will.firstName}
          willId={will.id}
        />
      </div>
      <TrackPurchaseEvent purchaseTrackingData={purchaseTrackingData} />
    </>
  );
}
