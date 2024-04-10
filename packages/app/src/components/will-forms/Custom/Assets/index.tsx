import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { routes } from "~/config/routes";
import { getUniquePeopleOptions } from "~/components/will-forms/utils";
import { canStillEditWill, fetchWillWithPets } from "~/utils/will";
import { CustomWillAssets } from "./WillForm";
import { formatInitialValues } from "./utils";

export const dynamic = "force-dynamic";

export async function CustomAssetsSimpleServerForm() {
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

  const guardian = will.people.find((person) => person.category === "GUARDIAN");

  return (
    <CustomWillAssets
      willId={will.id}
      initialValues={formatInitialValues(will)}
      peopleOptions={getUniquePeopleOptions(will.people)}
      hasChildren={!!guardian}
    />
  );
}
