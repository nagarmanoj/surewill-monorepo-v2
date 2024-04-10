import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { routes } from "~/config/routes";
import { fetchWill } from "~/utils/will";

export const dynamic = "force-dynamic";

export default async function ReviewWill() {
  const { userId } = auth();
  if (!userId) {
    redirect(routes.dashboard.main);
  }
  const will = await fetchWill(userId);
  if (!will?.creationType) {
    redirect(routes.dashboard.main);
  }
  let nextUrl = `${
    routes.dashboard.review.main
  }/${will.creationType.toLowerCase()}`;
  redirect(nextUrl);
}
