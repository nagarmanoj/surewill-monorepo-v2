import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { routes } from "~/config/routes";
import { canStillEditWill, fetchWillWithPets } from "~/utils/will";
import { WillRelationshipForm } from "./WillForm";
import { formatInitialValues } from "./utils";

export const dynamic = "force-dynamic";

export async function RelationshipSimpleServerForm() {
  const { userId } = auth();
  if (!userId) {
    redirect(routes.dashboard.main);
  }
  const will = await fetchWillWithPets(userId);
  if (!will || !will.firstName) {
    redirect(routes.dashboard.main);
  }

  const canEditCompletedWill = canStillEditWill(will?.firstGeneratedAt);
  if (!canEditCompletedWill) {
    redirect(routes.dashboard.main);
  }

  const hasSubmitted = !!will.people.find(
    (person) => person.category === "PARTNER"
  );

  return (
    <WillRelationshipForm
      willId={will.id}
      isWillPaid={will.status === "COMPLETE_PAID"}
      initialValues={formatInitialValues(will)}
      isInitialCreate={!hasSubmitted}
    />
  );
}
