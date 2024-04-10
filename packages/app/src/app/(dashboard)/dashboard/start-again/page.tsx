import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { routes } from "~/config/routes";
import { ConfirmStartAgain } from "~/components/ConfirmStartAgain";
import { fetchWill } from "~/utils/will";

export default async function StartWillAgain() {
  const { userId } = auth();
  if (!userId) {
    redirect(routes.auth.signIn);
  }
  const will = await fetchWill(userId);
  if (!will) {
    redirect(routes.dashboard.main);
  }

  // if (will.status !== "COMPLETE_PAID") {
  //   redirect(routes.dashboard.main);
  // }

  return (
    <div className="container">
      <h2 className="mb-8 text-3xl font-semibold text-brand-purple">
        Create another Will...
      </h2>
      <h3 className="mb-2 text-2xl">Confirm</h3>
      <p className="mb-8 text-brand-gray">
        Are you sure you want to create another Will?
      </p>
      <ConfirmStartAgain willId={will.id} />
    </div>
  );
}
