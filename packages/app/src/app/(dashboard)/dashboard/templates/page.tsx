import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { StartWill } from "~/components/DashboardPage/StartWill";
import { routes } from "~/config/routes";
import { canStillEditWill, fetchWill } from "~/utils/will";

export const dynamic = "force-dynamic";

export default async function WillTemplates() {
  const user = await currentUser();
  if (!user) {
    redirect(routes.auth.signIn);
  }
  const will = await fetchWill(user.id);
  if (!will) {
    redirect(routes.dashboard.main);
  }

  const canEditCompletedWill = canStillEditWill(will?.firstGeneratedAt);
  if (will.status === "COMPLETE_PAID" && !canEditCompletedWill) {
    redirect(routes.dashboard.main);
  }

  return <StartWill userFirstName={will?.firstName} isEdit />;
}
