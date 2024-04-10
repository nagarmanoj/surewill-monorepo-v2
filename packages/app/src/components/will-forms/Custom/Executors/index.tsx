import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { routes } from "~/config/routes";
import { getUniquePeopleOptions } from "~/components/will-forms/utils";
import { canStillEditWill, fetchWillWithPets } from "~/utils/will";
import { CustomWillExecutors } from "./WillForm";
import { formatInitialValues } from "./utils";

export const dynamic = "force-dynamic";

export async function CustomExecutorsSimpleServerForm() {
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

  return (
    <CustomWillExecutors
      willId={will.id}
      isWillPaid={will.status === "COMPLETE_PAID"}
      initialValues={formatInitialValues(will)}
      peopleOptions={getUniquePeopleOptions(will.people)}
    />
  );
}
