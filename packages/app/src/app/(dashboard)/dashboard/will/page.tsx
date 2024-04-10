import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { routes } from "~/config/routes";
import { fetchWill } from "~/utils/will";

export default async function WillPage() {
  const { userId } = auth();
  if (!userId) {
    redirect(routes.auth.signIn);
  }
  const will = await fetchWill(userId);
  if (!will?.creationType) {
    redirect(routes.dashboard.main);
  }
  let nextUrl = `${routes.dashboard.will}/${will.creationType.toLowerCase()}`;
  if (will.creationType === "CUSTOM") {
    nextUrl += "/roles";
  }
  redirect(nextUrl);
}
